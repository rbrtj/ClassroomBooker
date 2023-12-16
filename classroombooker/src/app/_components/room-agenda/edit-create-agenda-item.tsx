import { type AgendaItem } from "~/lib/types/agenda";
import { DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
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
} from "../ui/form";
import { Input } from "../ui/input";
import { api } from "~/trpc/react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import { cn } from "~/lib/lib";

const lectureFormSchema = z.object({
  name: z.string(),
  dayOfWeek: z.string(),
  type: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  evenWeek: z.boolean(),
  teacher: z.number(),
});

const EditCreateAgendaItem = ({
  agendaItem,
}: {
  agendaItem: AgendaItem | undefined;
}) => {
  const { data: teachers } = api.teacher.getTeachers.useQuery();
  const form = useForm<z.infer<typeof lectureFormSchema>>({
    resolver: zodResolver(lectureFormSchema),
    defaultValues: {
      name: agendaItem?.name,
      dayOfWeek: agendaItem?.dayOfWeek,
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
        </form>
      </Form>
    </>
  );
};

export default EditCreateAgendaItem;
