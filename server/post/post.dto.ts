import { IsString } from "class-validator";

class CreatePostDto {
  @IsString()
  public author: string;

  @IsString()
  public content: string;

  @IsString()
  public title: string;
}

export default CreatePostDto;

// Data transfer object (DTO) file that carries data between our functions.
//  It contains specification on how should the incoming data look.
