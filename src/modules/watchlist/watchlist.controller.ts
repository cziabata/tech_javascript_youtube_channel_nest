import { Body, Controller, Delete, Get, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { WatchListDTO } from './dto';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { CreateAssetResponse } from './response';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('watchlist')
export class WatchlistController {
  constructor(private readonly watchListService: WatchlistService){}

  @ApiTags("API")
  @ApiResponse({ status: 201, type: CreateAssetResponse })
  @UseGuards(JwtAuthGuard)
  @Post("create")
  createAsset(@Body() assetDto: WatchListDTO, @Req() request): Promise<CreateAssetResponse> {
    const user = request.user;
    return this.watchListService.createAsset(user, assetDto)
  }


  @ApiTags("API")
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteAsset(@Query("id") id: string, @Req() request): Promise<boolean> {
    const user = request.user;
    return this.watchListService.deleteAsset(user.id, id )
  }
}
