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

def get_schedule_data():
    links = get_schedule_links(BASE_URL)
    print(links)
    for link in links:
        response = requests.get(BASE_URL + link)
        soup = BeautifulSoup(response.content, 'html.parser')
        print(soup)
        table = soup.find('table', class_='tabela')
        rows = table.find_all('tr')

get_schedule_data()

