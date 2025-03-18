import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, PlusCircle, Search, MapPin } from "lucide-react";
import Link from "next/link";

// Mock data for schedules
const schedules = [
  {
    id: "1",
    courseCode: "CS101",
    courseName: "Introduction to Programming",
    instructor: "Dr. John Smith",
    room: "A-101",
    days: ["Monday", "Wednesday"],
    startTime: "09:00",
    endTime: "10:30",
    semester: "Fall 2023",
    status: "Active",
  },
  {
    id: "2",
    courseCode: "MATH201",
    courseName: "Calculus II",
    instructor: "Dr. Emily Johnson",
    room: "B-205",
    days: ["Tuesday", "Thursday"],
    startTime: "11:00",
    endTime: "12:30",
    semester: "Fall 2023",
    status: "Active",
  },
  {
    id: "3",
    courseCode: "ENG101",
    courseName: "English Composition",
    instructor: "Prof. Michael Davis",
    room: "C-310",
    days: ["Monday", "Wednesday", "Friday"],
    startTime: "14:00",
    endTime: "15:00",
    semester: "Fall 2023",
    status: "Active",
  },
  {
    id: "4",
    courseCode: "PHYS101",
    courseName: "Physics I",
    instructor: "Dr. Sarah Wilson",
    room: "D-150",
    days: ["Tuesday", "Thursday"],
    startTime: "13:00",
    endTime: "14:30",
    semester: "Fall 2023",
    status: "Active",
  },
  {
    id: "5",
    courseCode: "CHEM101",
    courseName: "General Chemistry",
    instructor: "Dr. Robert Brown",
    room: "E-220",
    days: ["Monday", "Wednesday"],
    startTime: "10:00",
    endTime: "11:30",
    semester: "Fall 2023",
    status: "Cancelled",
  },
];

export default function SchedulesPage() {
  return (
    <div className="container mx-auto space-y-6 py-6">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-3xl">Schedule Management</h1>
        <Button className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Create Schedule
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <CardTitle>Class Schedules</CardTitle>
            <div className="flex flex-col gap-2 md:flex-row">
              <div className="relative">
                <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search schedules..."
                  className="w-full pl-8 md:w-[250px]"
                />
              </div>
              <Select defaultValue="all-semesters">
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by semester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-semesters">All Semesters</SelectItem>
                  <SelectItem value="fall-2023">Fall 2023</SelectItem>
                  <SelectItem value="spring-2024">Spring 2024</SelectItem>
                  <SelectItem value="summer-2024">Summer 2024</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all-status">
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-status">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Schedules</TabsTrigger>
              <TabsTrigger value="monday">Monday</TabsTrigger>
              <TabsTrigger value="tuesday">Tuesday</TabsTrigger>
              <TabsTrigger value="wednesday">Wednesday</TabsTrigger>
              <TabsTrigger value="thursday">Thursday</TabsTrigger>
              <TabsTrigger value="friday">Friday</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4">
              <div className="overflow-hidden rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course</TableHead>
                      <TableHead>Instructor</TableHead>
                      <TableHead>Schedule</TableHead>
                      <TableHead>Room</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {schedules.map((schedule) => (
                      <TableRow key={schedule.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {schedule.courseCode}
                            </div>
                            <div className="text-muted-foreground text-sm">
                              {schedule.courseName}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{schedule.instructor}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <div className="flex items-center text-sm">
                              <Calendar className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                              {schedule.days.join(", ")}
                            </div>
                            <div className="flex items-center text-sm">
                              <Clock className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                              {schedule.startTime} - {schedule.endTime}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <MapPin className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                            {schedule.room}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              schedule.status === "Active"
                                ? "success"
                                : "destructive"
                            }
                          >
                            {schedule.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Link
                            href={`/dashboard/admin/schedules/${schedule.id}`}
                          >
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </TabsContent>
            <TabsContent value="monday">
              {/* Similar content for Monday tab */}
              <div className="py-10 text-center text-muted-foreground">
                Filter applied for Monday schedules
              </div>
            </TabsContent>
            <TabsContent value="tuesday">
              {/* Similar content for Tuesday tab */}
              <div className="py-10 text-center text-muted-foreground">
                Filter applied for Tuesday schedules
              </div>
            </TabsContent>
            <TabsContent value="wednesday">
              {/* Similar content for Wednesday tab */}
              <div className="py-10 text-center text-muted-foreground">
                Filter applied for Wednesday schedules
              </div>
            </TabsContent>
            <TabsContent value="thursday">
              {/* Similar content for Thursday tab */}
              <div className="py-10 text-center text-muted-foreground">
                Filter applied for Thursday schedules
              </div>
            </TabsContent>
            <TabsContent value="friday">
              {/* Similar content for Friday tab */}
              <div className="py-10 text-center text-muted-foreground">
                Filter applied for Friday schedules
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
