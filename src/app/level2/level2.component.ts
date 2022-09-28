import { Component } from '@angular/core';
@Component({
  templateUrl: './level2.component.html',
  styleUrls: ['./level2.component.css'],
})

export class Level2Component {

  public boardContent!: number[][];

  public currentPlayerIndex = 1;

  private currentWinnerIx = 0;

  private playerNames = ["...","Red","Blue"];

  constructor(){
    this.restart();
  }

  public drop(colIx: number) {
    if(this.currentWinnerIx===0)
    {
      let freeRow = this.getFreeRow(colIx);
      if(freeRow!==-1)
      {
        this.boardContent[freeRow][colIx]=this.currentPlayerIndex;

        this.currentWinnerIx = this.getWinnerIndex(freeRow,colIx);
        if(this.currentWinnerIx!==0)
        {
          this.currentWinnerIx=this.currentPlayerIndex;
        }
        this.currentPlayerIndex = this.currentPlayerIndex === 1 ? 2 : 1;

      }
    }

  }

  public getWinnerIndex(rowIX:number,colIX:number):number
  {
    let horizontalAndVerticalValue = this.checkHorizontalAndVertical(rowIX,colIX);
    if(horizontalAndVerticalValue!==0)
    {
      return horizontalAndVerticalValue;
    }
    let diagonalsValue = this.checkDiagonals(rowIX,colIX);
    if(diagonalsValue!==0)
    {
      return diagonalsValue;
    }
    return 0;
  }

  public getStyle(rowIX:number,colIX:number){
    return this.playerIndexToClass(this.boardContent[rowIX][colIX]);
  }

  public getCurrentWinner():String{
    return this.playerNames[this.currentWinnerIx];

  }


  //Submethods
  private checkDiagonals(rowIx:number,colIx:number):number{
    let neighbourCount=1;
    let shouldBreak = false;

    for(let i = 1;i<this.boardContent.length&&!shouldBreak;i++)
    {
       if(rowIx+i<this.boardContent.length&&colIx+i<this.boardContent[0].length)
       {
          if(this.boardContent[rowIx+i][colIx+i]===this.currentPlayerIndex)
          {
            neighbourCount++;
          }
          else{
            shouldBreak=true;
          }
       }
    }
    shouldBreak=false;
    for(let i = 1;i<this.boardContent.length&&!shouldBreak;i++)
    {
       if(rowIx-i>=0&&colIx-i>=0)
       {
          if(this.boardContent[rowIx-i][colIx-i]===this.currentPlayerIndex)
          {
            neighbourCount++;
          }
          else{
            shouldBreak=true;
          }
       }
    }
    if(neighbourCount>=4)
    {
      return this.currentPlayerIndex;
    }


    for(let i = 1;i<this.boardContent.length&&!shouldBreak;i++)
    {
       if(rowIx+i<this.boardContent.length&&colIx-i>=0)
       {
          if(this.boardContent[rowIx+i][colIx-i]===this.currentPlayerIndex)
          {
            neighbourCount++;
          }
          else{
            shouldBreak=true;
          }
       }
    }
    shouldBreak=false;
    for(let i = 1;i<this.boardContent.length&&!shouldBreak;i++)
    {
       if(rowIx-i>=0&&colIx+i<this.boardContent[0].length)
       {
          if(this.boardContent[rowIx-i][colIx+i]===this.currentPlayerIndex)
          {
            neighbourCount++;
          }
          else{
            shouldBreak=true;
          }
       }
    }
    if(neighbourCount>=4)
    {
      return this.currentPlayerIndex;
    }
    return 0;
  }

  private checkHorizontalAndVertical(rowIx:number,colIx:number):number{
    let neighbourCount = 0;
    let shouldBreak= false;
    //horizontal
    for(let i = 0;i<this.boardContent[0].length&&!shouldBreak;i++)
    {
       if(this.boardContent[rowIx][i]===this.currentPlayerIndex)
       {
        neighbourCount++;

       }
       else{
        shouldBreak=true;

       }
    }
    if(neighbourCount>=4)
    {
      return this.currentPlayerIndex;
    }

    //vertical
    shouldBreak= false;
    neighbourCount=0;
    for(let i = rowIx;i<this.boardContent.length&&!shouldBreak;i++)
    {
       if(this.boardContent[i][colIx]===this.currentPlayerIndex)
       {
        neighbourCount++;
       }
       else{
        shouldBreak=true;
       }
    }
    if(neighbourCount>=4)
    {
      return this.currentPlayerIndex;
    }
    return 0;
  }

  private getFreeRow(colIx:number): number{

    for(let i = 0;i<4;i++)
    {
      if(this.boardContent[i][colIx]==0)
      {
        if(i===4||(i+1<4&&this.boardContent[i+1][colIx])!==0)
        {
          return i;
        }
      }
    }

    return -1;
  }

  private playerIndexToClass(playerIx: number): string {
    if (playerIx !== 0) {
      return `occupied-${playerIx}`;
    }

    return '';
  }

  public restart():void{
    this.boardContent=[
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0]
    ]
    this.currentPlayerIndex=1;
    this.currentWinnerIx=0;
  }

  // TODO: Complete this class by adding the appropriate code
  // At the end, this should become a working connect-four-game on a 4 x 4 board.
}
