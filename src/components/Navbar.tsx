import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export default function Navbar() {
  return (
    <NavigationMenu>
      <NavigationMenuTrigger>
        <NavigationMenuIndicator />
      </NavigationMenuTrigger>

      <NavigationMenuContent>
        <NavigationMenuList>

          <NavigationMenuItem>
            <NavigationMenuLink href="/dashboard">Dashboard</NavigationMenuLink>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <NavigationMenuLink href="/login">Login</NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink href="/register">Register</NavigationMenuLink>
          </NavigationMenuItem>

        </NavigationMenuList>
      </NavigationMenuContent>
    </NavigationMenu>
  );
}
