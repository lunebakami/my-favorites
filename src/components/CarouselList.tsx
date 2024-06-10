"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import CardWithImage from "./CardWithImage";
import { Character } from "@/app/dashboard/page";

type CarouselCardItemProps = {
  _id: number;
  title: string;
  description: string;
  imageUrl: string;
};

export default function CarouselList({
  items,
  handleClick,
  buttonText = "Star",
}: {
  items: CarouselCardItemProps[];
  buttonText?: string;
  handleClick?: (character: Partial<Character>) => void;
}) {
  return (
    <Carousel
      opts={{
        align: "center",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem key={index} className="md:basis-1/4 lg:basis-1/4">
            <div className="p-1">
              <CardWithImage
                buttonText={buttonText}
                clickHandler={() => handleClick && handleClick({
                  _id: item._id,
                  name: item.title,
                  imageUrl: item.imageUrl,
                })}
                title={item.title}
                description={item.description}
                image={item.imageUrl}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
