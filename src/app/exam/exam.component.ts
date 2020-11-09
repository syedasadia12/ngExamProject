import { Component, OnInit } from '@angular/core';
import { Question, ServiceComponent } from '../question.service';


@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {

  public id:number;
  public my_question:Question;
  public hasNextQuestion:boolean;
  public finished:boolean;
  public invalid:boolean = false;
  public checked:string="checked";
  public correct:number = 0;
  

  constructor(private serviceComponent:ServiceComponent) { }
  questions:Question[] = [];
  ngOnInit(): void {
    this.serviceComponent.loadQuestion().subscribe(data=>{
      this.questions=data;
      console.log(this.questions);
      this.id = -1;
      this.hasNextQuestion=true;
      this.finished = false;
      this.nextQuestion();
    });
  }
  nextQuestion():void{
    if(this.id<this.questions.length-1){
      this.my_question = this.questions[++this.id];
      if(this.id==this.questions.length-1){
        this.hasNextQuestion=false;
      }
    }else{
      this.finished = true;
    }
    return;
  }
  previousQuestion():void{
      this.invalid = false;
      this.my_question = this.questions[--this.id];
      this.correct--;
    
  }
  checkAns(obj):void{
    if(obj[this.my_question.id]!="" && obj[this.my_question.id]!=undefined){
      this.my_question.selected = obj[this.my_question.id];
      if(`${this.my_question.selected}`==`${this.my_question.answer}`){
        this.correct++;
      }
      this.nextQuestion();
      this.invalid = false;
    }else{
      this.invalid = true;
    }
    console.log(obj);
  }
  verSelect(id):boolean{
    console.log(this.my_question.selected)
    return this.my_question.selected==id;
  }
  resetAll():void{
    this.finished = false;
    this.id = -1;
    this.hasNextQuestion = true;
    for(let question of this.questions){
      question.selected = 0;
    }
    this.nextQuestion();
  }
  

}
