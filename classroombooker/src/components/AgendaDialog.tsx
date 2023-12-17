"use client";
import { type AgendaItem } from "~/lib/types/agenda";
import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { api } from "~/trpc/react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
import { cn } from "~/lib/lib";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { CLASSES_HOURS, DAYS_OF_WEEK } from "~/constants/Schedule";
import { DayOfWeek } from "~/constants/DayOfWeekMap";
import { LectureTypes } from "~/constants/LectureTypes";
import { LectureTypeMap } from "~/constants/LectureTypeMap";
import { getPossibleLectureEndTime } from "~/utils/GetPossibleLectureEndTime";
import { parityBooleanToString } from "~/utils/ParityBooleanToString";

const lectureFormSchema = z.object({
  name: z.string(),
  dayOfWeek: z.string(),
  type: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  evenWeek: z.boolean(),
  teacher: z.number(),
});

const AgendaDialog = ({
  agendaItem,
  day,
}: {
  agendaItem: AgendaItem | undefined;
  day: string;
}) => {
  const { data: teachers } = api.teacher.getTeachers.useQuery();

  const form = useForm<z.infer<typeof lectureFormSchema>>({
    resolver: zodResolver(lectureFormSchema),
    defaultValues: {
      name: agendaItem?.name,
      dayOfWeek: agendaItem?.dayOfWeek ?? day,
      type: agendaItem?.type,
      startTime: agendaItem?.startTime,
      endTime: agendaItem?.endTime,
      evenWeek: agendaItem?.evenWeek,
      teacher: agendaItem?.teacherId,
    },
  });

  const onSubmit = (data: z.infer<typeof lectureFormSchema>) => {
    console.log(data);
  };

  const lectureStartTimes = CLASSES_HOURS.map((hour) => hour.startTime);

  const availableLectureEndTimes = getPossibleLectureEndTime(
    form.watch("startTime"),
  );

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          {agendaItem ? "Edytuj istniejącą" : "Stwórz"} lekcję
        </DialogTitle>
        <DialogDescription>
          {agendaItem
            ? "Możesz edytować istniejącą lekcję"
            : "Stwórz nową lekcję uzupełniając poniższe pola"}
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nazwa zajęć</FormLabel>
                <FormControl>
                  <Input placeholder="Język angielski" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {teachers && (
            <FormField
              control={form.control}
              name="teacher"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Prowadzący</FormLabel>
                  <Popover modal={true}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "justify-between",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value
                            ? teachers.find(
                                (teacher) => teacher.id === field.value,
                              )?.name
                            : "Wybierz prowadzącego"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Command>
                        <CommandInput placeholder="Szukaj prowadzącego" />
                        <CommandEmpty>
                          Nie znaleziono prowadzącego.
                        </CommandEmpty>
                        <CommandGroup className="h-96 overflow-y-auto">
                          {teachers.map((teacher) => (
                            <CommandItem
                              value={teacher.name}
                              key={teacher.id}
                              onSelect={() => {
                                form.setValue("teacher", teacher.id);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  teacher.id === field.value
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                              {teacher.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="dayOfWeek"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dzień tygodnia</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={DayOfWeek[field.value] ?? day}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Wybierz dzień tygodnia" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {DAYS_OF_WEEK.map((day) => (
                      <SelectItem key={day} value={day}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rodzaj zajęć</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Wybierz rodzaj zajęć" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {LectureTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {LectureTypeMap[type]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Godzina rozpoczęcia</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Wybierz godzine rozpoczęcia zajęć" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {lectureStartTimes.map((hour) => (
                      <SelectItem key={hour} value={hour}>
                        {hour}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Godzina zakończenia</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Wybierz godzine zakończenia zajęć" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {availableLectureEndTimes.map((hour) => (
                      <SelectItem key={hour} value={hour}>
                        {hour}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="evenWeek"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tydzień</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value === "Parzysty");
                  }}
                  defaultValue={parityBooleanToString(field.value)}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Parzysty/Nieparzysty" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={parityBooleanToString(true)}>
                      Parzysty
                    </SelectItem>
                    <SelectItem value={parityBooleanToString(false)}>
                      Nieparzysty
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <Button type="submit">Potwierdz</Button>
        </form>
      </Form>
    </>
  );
};

export default AgendaDialog;
