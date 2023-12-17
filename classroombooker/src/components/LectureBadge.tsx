import { type LectureType } from "~/types/LectureType";
import { Badge } from "./ui/badge";
import { cn } from "~/lib/lib";

interface LectureBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant: LectureType;
}

export const LectureBadge = ({
  variant,
  className,
  ...props
}: LectureBadgeProps) => {
  const badgeVariants = {
    lecture: "bg-blue-300",
    seminar: "bg-green-300",
    other: "bg-yellow-300",
    practice: "bg-orange-300",
  };

  return (
    <Badge className={cn(badgeVariants[variant], className)} {...props}></Badge>
  );
};
