import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/AdminServices/admin.service';
import { Actor } from 'src/app/models/ActorModel';
import * as $ from 'jquery';

@Component({
  selector: 'app-actor-add',
  templateUrl: './actor-add.component.html',
  styleUrls: ['./actor-add.component.css']
})
export class ActorAddComponent implements OnInit {
  

  isEditMode:boolean
  success:string;
  error:string
  title:string;
  msg:string;
  btn:string
actor:Actor[]
  actorModel:Actor;
  id:number
  ActorForm:FormGroup
  actorName:string
  img:File
  urlImg:string
    constructor(private fb:FormBuilder,private service:AdminService,private activateRoute:ActivatedRoute,private router:Router) { }
  
    ngOnInit(): void {
      this.urlImg="assets/images-error/Actor.png"
      this.img=null
      // $('.custom-file-input').on('change', function () {
      //   var fileName = $(this).val().split("\\").pop()
      //   $(this).next('.custom-file-label').html(fileName)
      //   console.log(fileName)})
     this.isEditMode=false;
      this.actorModel={
        id:0,
        actorName:"",
        actorPicture:""
      }
      this.title=""
      this.msg=""
      this.btn=""
      this.actor=[]
     this.ActorForm= this.fb.group({
        actorName:['',[Validators.required,Validators.maxLength(200)]],
        actorPicture:[null]
      })
      this.success=""
      this.error=""
    
     this.getActorsList();
     this.activateRoute.paramMap.subscribe((param)=>{
      const id=parseInt(param.get('id'));
      const name=param.get('name')
      if(!id&&!name){
        this.title="اضافة ممثل جديد"
        this.btn="اضافه"
        this.isEditMode=false
      }else{

        this.service.getActor(id).subscribe((actor)=>{
          this.ActorForm.patchValue({
            actorName:actor.actorName,
  
          })
          this.urlImg="assets/actorsPicture/"+actor.actorPicture;
          fetch(this.urlImg).then(res=>res.blob()).then(blob=>{
            var file=new File([blob],actor.actorPicture);
            this.img=file;
          })
        })
        this.isEditMode=true
        this.title="تعديل الممثل"
        this.btn="تعديل"
        this.id=id;
        this.actorName=name
       
      }
    })
     
    }
   
    AddActor(){
      // debugger
      const name=this.ActorForm.get("actorName").value;
      const pic=this.ActorForm.get("actorPicture").value;
      if(this.id>0){
        const fd=new FormData();
        fd.append('id',this.id.toString())
      fd.append('actorPicture',this.img);
      fd.append('actorName',this.ActorForm.value.actorName)
        this.service.editActor(fd).subscribe(()=>{this.goList()})
  
      }else{
      if(this.ActorForm.valid){
       
        this.actorModel.id=0;
      const fd=new FormData();
      fd.append('actorPicture',this.img);
      fd.append('actorName',this.ActorForm.value.actorName)
        // this.actorModel.actorPicture=pic
        // this.actorModel.actorName=name;
      this.service.AddActor(fd).subscribe(()=>{
      this.success="تم الاضافه بنجاح"
      this.ActorForm.reset();
      this.img=null
      },(error)=>{
        this.error=error
      })
      }
    }
  
  }
  handlPic(event:any){
    if(event.target.files!==null&&event.target.files.length>0){
      this.img=event.target.files[0];
      const reader= new FileReader();
      reader.onload=function(e){
        $('#img').attr('src',e.target.result);
      }
      reader.readAsDataURL(this.img)
    }else{this.img=null
    $('#img').attr('src',"assets/images-error/Actor.png")
  }
}
  isactorNameExist(){
      const act=this.ActorForm.get("actorName").value;
      
      for(let item of this.actor){
        if(item.actorName===act &&!this.isEditMode){
          this.msg="اسم الممثل موجود"
          return true;
         }//else if(!this.isEditMode||item.categoryName===cat||item.id!==this.categoryModel.id){
        //   this.msg="اسم التصنيف موجود"
        //   return true;}
      
    }
      return false;
    }
    getActorsList(){
      this.service.GetALlActors().subscribe((data)=>{
        this.actor=data
      })
    }
    goList(){
      sessionStorage.setItem("act","act");
    this.router.navigate(['controlpanel'])}
     
  }

  