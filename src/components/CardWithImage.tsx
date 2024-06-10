"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";

type CardWithImageProps = {
  title: string;
  description: string;
  image: string;
  clickHandler?: () => void;
  buttonText?: string;
};

export default function CardWithImage({
  title,
  description,
  image,
  clickHandler,
  buttonText = "Star",
}: CardWithImageProps) {
  return (
    <Card className="h-80 flex flex-col justify-start items-center">
      <CardContent className="flex aspect-square items-start justify-center p-4 mt-4">
        <Avatar className="flex items-end">
          <div className="bg-slate-300  overflow-hidden h-40 w-40 shadow rounded-full flex items-center justify-center">
            <AvatarImage src={image} alt={title} />
          </div>
          <AvatarFallback>{title}</AvatarFallback>
        </Avatar>
      </CardContent>
      <CardFooter className="h-full flex justify-between items-end gap-10">
        <div>
          <h3 className="text-md font-semibold">{title}</h3>
          <span className="inline-block text-xs pb-2">{description}</span>
        </div>
        <Button onClick={() => clickHandler && clickHandler()} variant="secondary">{buttonText}</Button>
      </CardFooter>
    </Card>
  );
}
