"use client";
import { type AgendaItem } from "~/lib/types/agenda";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CLASSES_HOURS, DAYS_OF_WEEK } from "~/constants/Schedule";
import { getPossibleLectureEndTime } from "~/utils/GetPossibleLectureEndTime";
import { type Teacher } from "~/types/Teachers";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { cn } from "~/lib/lib";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { DayOfWeekMap } from "~/constants/DayOfWeekMap";
import { LectureTypes } from "~/constants/LectureTypes";
import { LectureTypeMap } from "~/constants/LectureTypeMap";
import { parityBooleanToString } from "~/utils/ParityBooleanToString";
import { DialogClose, DialogFooter } from "./ui/dialog";
import { api } from "~/trpc/react";
import { type DayOfWeek } from "~/types/DayOfWeek";
import { type Lecture } from "~/types/Lecture";
import { useToast } from "./ui/use-toast";

const lectureFormSchema = z.object({
  name: z
    .string({
      required_error: "Nazwa zajęć jest wymagana",
    })
    .min(3, {
      message: "Nazwa zajęć musi mieć od 3 do 15 znaków",
    })
    .max(15, {
      message: "Nazwa zajęć musi mieć od 3 do 15 znaków",
    }),
  dayOfWeek: z.custom<DayOfWeek>(),
  type: z.custom<Lecture>().refine((type) => !!type, {
    message: "Wybierz rodzaj zajęć",
  }),
  startTime: z.string({
    required_error: "Wybierz godzinę rozpoczęcia zajęć",
  }),
  endTime: z.string({
    required_error: "Wybierz godzinę zakończenia zajęć",
  }),
  evenWeek: z.boolean({
    required_error: "Wybierz tydzień",
  }),
  teacher: z.number({
    required_error: "Wybierz prowadzącego",
  }),
});

export default function LectureForm({
  agendaItem,
  day,
  teachers,
  refetchLectures,
}: {
  agendaItem: AgendaItem | undefined;
  day: DayOfWeek;
  teachers: Teacher[] | undefined;
  refetchLectures: () => Promise<void>;
}) {
  const form = useForm<z.infer<typeof lectureFormSchema>>({
    resolver: zodResolver(lectureFormSchema),
    defaultValues: {
      name: agendaItem?.name ?? "",
      dayOfWeek: (agendaItem?.dayOfWeek as DayOfWeek) ?? day,
      type: (agendaItem?.type as Lecture) ?? "",
      startTime: agendaItem?.startTime ?? "",
      endTime: agendaItem?.endTime ?? "",
      evenWeek: agendaItem?.evenWeek ?? true,
      teacher: agendaItem?.teacherId ?? 0,
    },
  });

  const { toast } = useToast();

  const { mutate: deleteLecture } = api.lectures.deleteLecture.useMutation({
    onSuccess: async () => {
      await refetchLectures();
      toast({
        title: "Usunięto zajęcia",
        description: "Zajęcia zostały pomyślnie usunięte",
        variant: "default",
      });
    },
    onError: () => {
      toast({
        title: "Błąd",
        description: "Wystąpił błąd podczas usuwania zajęć",
        variant: "destructive",
      });
    },
  });

  const { mutate: saveLecture } = api.lectures.addLecture.useMutation({
    onSuccess: async () => {
      await refetchLectures();
      toast({
        title: "Dodano zajęcia",
        description: "Zajęcia zostały pomyślnie dodane",
        variant: "default",
      });
    },
    onError: () => {
      toast({
        title: "Błąd",
        description: "Wystąpił błąd podczas dodawania zajęć",
        variant: "destructive",
      });
    },
  });

  const lectureStartTimes = CLASSES_HOURS.map((hour) => hour.startTime);

  const availableLectureEndTimes = getPossibleLectureEndTime(
    form.watch("startTime"),
  );

  const onSubmit = (data: z.infer<typeof lectureFormSchema>) => {
    saveLecture({
      name: data.name,
      dayOfWeek: data.dayOfWeek,
      type: data.type,
      startTime: data.startTime,
      endTime: data.endTime,
      evenWeek: data.evenWeek,
      teacherId: data.teacher,
      roomId: 1,
    });
  };

  const handleDeleteLecture = () => {
    if (!agendaItem) return;
    deleteLecture({ id: agendaItem.id });
  };

  return (
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
                      {field.value && teachers
                        ? teachers.find((teacher) => teacher.id === field.value)
                            ?.name
                        : "Wybierz prowadzącego"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <FormMessage />
                <PopoverContent className="p-0">
                  <Command>
                    <CommandInput placeholder="Szukaj prowadzącego" />
                    <CommandEmpty>Nie znaleziono prowadzącego.</CommandEmpty>
                    <CommandGroup className="h-96 overflow-y-auto">
                      {teachers?.map((teacher) => (
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

        <FormField
          control={form.control}
          name="dayOfWeek"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dzień tygodnia</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value ?? day}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Wybierz dzień tygodnia" />
                  </SelectTrigger>
                </FormControl>
                <FormMessage />
                <SelectContent>
                  {DAYS_OF_WEEK.map((day) => (
                    <SelectItem key={day} value={day}>
                      {DayOfWeekMap[day]}
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Wybierz rodzaj zajęć" />
                  </SelectTrigger>
                </FormControl>
                <FormMessage />
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Wybierz godzine rozpoczęcia zajęć" />
                  </SelectTrigger>
                </FormControl>
                <FormMessage />
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Wybierz godzine zakończenia zajęć" />
                  </SelectTrigger>
                </FormControl>
                <FormMessage />
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
                <FormMessage />
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

        <DialogFooter>
          <DialogClose asChild>
            {agendaItem && (
              <Button
                type="button"
                variant="destructive"
                className="w-1/3"
                onClick={() => handleDeleteLecture()}
              >
                Usuń
              </Button>
            )}
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit" className="w-1/3">
              Zatwierdź
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </Form>
  );
}
