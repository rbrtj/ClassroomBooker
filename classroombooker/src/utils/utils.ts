import axios, { type AxiosResponse } from "axios";
import Cheerio from "cheerio";
import { JSDOM } from "jsdom";
import { TIME_RANGES } from "~/constants";

const BASE_URL = "https://podzial.mech.pk.edu.pl/stacjonarne/html/";

const getScheduleLinks = async () => {
  const response: AxiosResponse<string> = await axios.get(BASE_URL);
  const $ = Cheerio.load(response.data);
  const listFrameURL = $('frame[name="list"]').attr("src");
  const listResponse: AxiosResponse<string> = await axios.get(
    BASE_URL + listFrameURL,
  );
  const list$ = Cheerio.load(listResponse.data);
  const links = list$("div#sale a")
    .map((_, a) => list$(a).attr("href"))
    .get() as string[];
  return links;
};

const extractScheduleData = (
  html: string,
): Record<string, Record<string, string>> => {
  const $ = Cheerio.load(html);
  const scheduleData: Record<string, Record<string, string>> = {};
  const daysOfWeek = ["Poniedzialek", "Wtorek", "Sroda", "Czwartek", "Piatek"];

  $("table.tabela tr")
    .slice(1)
    .each((_, row) => {
      const columns = $(row).find("td").toArray();
      const timeRange = $(columns[1]).text().trim();

      daysOfWeek.forEach((day, index) => {
        if (!scheduleData[day]) {
          scheduleData[day] = {};
        }

        const content = $(columns[index + 2])
          .text()
          .trim()
          .replace(/\s+/g, " ");
        if (content && timeRange) {
          scheduleData[day]![timeRange] = content;
        }
      });
    });

  // Uzupełnienie brakujących wartości
  daysOfWeek.forEach((day) => {
    TIME_RANGES.forEach((timeRange) => {
      if (!scheduleData[day]![timeRange]) {
        scheduleData[day]![timeRange] = "";
      }
    });
  });

  return scheduleData;
};

export const getScheduleData = async (): Promise<
  Array<{
    room: string | undefined;
    class: Record<string, Record<string, string>>;
  }>
> => {
  const links = await getScheduleLinks();
  const allData = [];
  for (const link of links) {
    const response: AxiosResponse<string> = await axios.get<string>(
      BASE_URL + link,
    );
    const $ = Cheerio.load(response.data);
    const roomName = $("span.tytulnapis").text().trim();
    const schedule = extractScheduleData(response.data);

    allData.push({
      room: roomName,
      class: schedule,
    });
  }

  return allData;
};
