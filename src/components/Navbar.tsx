"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default function Navbar() {
  return (
    <NavigationMenu className="max-w-full w-full flex justify-between">
      <NavigationMenuList className="w-100">
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </Link>{" "}
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              My Favorites
            </NavigationMenuLink>
          </Link>{" "}
        </NavigationMenuItem>
      </NavigationMenuList>

      
      <NavigationMenuList>
        <NavigationMenuItem className="mt-2 mr-4">
          <LogoutButton />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
