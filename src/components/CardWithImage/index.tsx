"use client";

import { Button } from "../ui/button";
import {
  Card,
  Container,
  Image,
  ImageContainer,
  InfoContainer,
} from "./styles";

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
    <Card>
      <ImageContainer>
        <Image src={image} alt={title} />
      </ImageContainer>
      <Container>
        <InfoContainer>
          <h3>{title}</h3>
          <p>{description}</p>
        </InfoContainer>
        <Button onClick={clickHandler}>{buttonText}</Button>
      </Container>
    </Card>
  );
}
