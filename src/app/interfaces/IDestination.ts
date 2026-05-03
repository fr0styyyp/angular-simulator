import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface IDestination {
  title: string;
  description: string;
  price: string;
  starIcon: IconDefinition;
  rating: number;
  imageUrl: string;
}