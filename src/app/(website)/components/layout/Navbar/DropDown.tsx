"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { RiAccountCircleLine } from "react-icons/ri"
import Link from "next/link"
import { useSession } from "next-auth/react"
import UserAcoount from "./UserAcoount"

export function DropdownMenuRadioGroupDemo() {
  const [position, setPosition] = React.useState("bottom")
  const {data:session,status} = useSession()
  console.log({session});
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
        <RiAccountCircleLine className="w-10 h-10 relative" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white">
        {/* <DropdownMenuLabel>Panel Position</DropdownMenuLabel> */}
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            
        <DropdownMenuRadioItem value="bottom">{session?.user?.role=="USER"? <Link href="/user" >USER</Link>: <Link href="/sign-in" >USER</Link>}</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bottom">{session?.user?.role=="ADMIN"? <Link href="/dashboard" >ADMIN</Link>: <Link href="/sign-in" >ADMIN</Link>}</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="right">{session?.user?.role=="SUPER_ADMIN"? <Link href="/all-dashboard" >SUPER ADMIN</Link>: <Link href="/sign-in" >SUPER ADMIN</Link>}</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="right"><UserAcoount /></DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
