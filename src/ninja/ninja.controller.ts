import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { type } from 'os';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjaService } from './ninja.service';
import { BeltGuard } from 'src/belt/belt.guard';

@Controller('ninja')
@UseGuards(BeltGuard)
export class NinjaController {
  constructor(private readonly ninjaService: NinjaService) {}
  // GET/ ninja ?type=fast-> []
  @Get()
  getNinjas(@Query('weapon') weapon: 'nunchucks' | 'stars') {
    // const serviece = new NinjaService();

    return this.ninjaService.getNinjas(weapon);
  }

  @Get(':id')
  getOneNinja(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.ninjaService.getNinja(id);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  @Post()
  createNinja(@Body(new ValidationPipe()) createNinjaDto: CreateNinjaDto) {
    return this.ninjaService.createNinja(createNinjaDto);
  }

  @Put(':id')
  updateNinja(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNinjaDto: UpdateNinjaDto,
  ) {
    return this.ninjaService.updateNinja(id, updateNinjaDto);
  }

  @Delete(':id')
  removeNinja(@Param('id') id: string) {
    return this.ninjaService.removeNinja(+id);
  }
  // GET/ninjas/ :id ->{   }
  //POST/ninja

  //PUT /ninjas/:id ->{   }

  //DELETE / ninja/:id
}
