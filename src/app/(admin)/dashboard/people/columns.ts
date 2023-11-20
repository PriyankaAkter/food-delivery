"use client";
import { ColumnDef } from '@tanstack/react-table'
import { Person } from '../components/shared/data';

// {
//     "id": 1,
//     "first_name": "Elnora",
//     "last_name": "Mallall",
//     "email": "emallall0@themeforest.net",
//     "gender": "Female",
//     "dob": "2023-04-29T15:00:01Z"
//   }


export const columns: ColumnDef<Person>[] = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "First Name",
    accessorKey: "first_name",
  },
  {
    header: "Last Name",
    accessorKey: "last_name",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Gender",
    accessorKey: "gender",
  },

  {
    header: "Date of Birth",
    accessorKey: "dob",
  },
];



// console.log({columns});

