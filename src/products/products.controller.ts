import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { error } from 'console';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { PRODUCT_SERVICE } from 'src/config';

@Controller('products')
export class ProductsController {
  constructor(@Inject(PRODUCT_SERVICE) private readonly client: ClientProxy) {

  }

  @Post()
  createProduct() {
    return 'Crea un producto';
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    return this.client.send({ cmd: 'find_all_products' }, paginationDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {

    try {
      const product = await firstValueFrom(this.client.send({ cmd: 'find_one_product' }, { id }));
      return product;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Delete(':id')
  deleteOneProduct(@Param('id') id: string) {
    return 'Esta función elimina el producto ' + id;
  }

  @Patch(':id')
  updateOneProduct(@Param('id') id: string, @Body() body: any) {
    return 'Esta función actualiza el producto ' + id;
  }

}
