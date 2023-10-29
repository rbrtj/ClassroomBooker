import requests
from bs4 import BeautifulSoup

BASE_URL = "https://podzial.mech.pk.edu.pl/stacjonarne/html/"

def get_schedule_links(url):
    response = requests.get(url)
    response.raise_for_status()

    soup = BeautifulSoup(response.text, 'html.parser')
    list_frame_url = soup.find('frame', {'name': 'list'})['src']

    list_response = requests.get(url + list_frame_url)
    list_response.raise_for_status()
    
    list_soup = BeautifulSoup(list_response.text, 'html.parser')
    class_rooms = list_soup.find('div', {"id": "sale"})
    links = [link['href'] for link in class_rooms.find_all('a')]
    
    return links

def extract_schedule_data(table):
    schedule_data = {}
    days_of_week = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek"]

    rows = table.find_all('tr')[1:]  # pomijamy pierwszy wiersz, bo to nagłówki

    for row in rows:
        columns = row.find_all('td')
        time_range = columns[1].get_text(strip=True)

        for day, column in zip(days_of_week, columns[2:]):
            if day not in schedule_data:
                schedule_data[day] = {}

            content = column.get_text(strip=True, separator=" ")
            if content:
                schedule_data[day][time_range] = content

    return schedule_data


def get_schedule_data():
    links = get_schedule_links(BASE_URL)
    all_data = []
    # for link in links:
    response = requests.get(BASE_URL + links[1])
    soup = BeautifulSoup(response.content, 'html.parser')
    room_name = soup.find('span', class_="tytulnapis").text.strip()
    table = soup.find('table', class_='tabela')
    schedule = extract_schedule_data(table)
    all_data.append({
    "sala": room_name,
    "zajecia": schedule
    })
    return all_data

data = get_schedule_data();
print(data);

