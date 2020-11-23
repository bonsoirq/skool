interface IAdvancementLevel {
  id: string;
  name: string;
}

export function AdvancementLevel({
  id,
  name,
}: IAdvancementLevel): IAdvancementLevel {
  return {
    id,
    name,
  }
}
