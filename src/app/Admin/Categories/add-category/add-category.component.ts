import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { AdminService } from 'src/app/AdminServices/admin.service';
import { Caregory } from 'src/app/models/categoryModel';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
isEditMode:boolean
success:string;
error:string
title:string;
msg:string;
btn:string
category:Caregory[]
categoryModel:Caregory;
id:number
categoryForm:FormGroup
catName:string
  constructor(private fb:FormBuilder,private service:AdminService,private activateRoute:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
   this.isEditMode=false;
    this.categoryModel={
      id:0,
      categoryName:""
    }
    this.title=""
    this.msg=""
    this.btn=""
    this.category=[]
   this.categoryForm= this.fb.group({
      "categoryName":['',[Validators.required,Validators.maxLength(250)]]
    })
    this.success=""
    this.error=""

   this.getCategoryList();
   this.activateRoute.paramMap.subscribe((param)=>{
    const id=parseInt(param.get('id'));
    const name=param.get('name')
    if(!id&&!name){
      this.title="اضافة تصنيف جديد"
      this.btn="اضافه"
      this.isEditMode=false
    }else{
      this.isEditMode=true
      this.title="تعديل التصنيف"
      this.btn="تعديل"
      this.id=id;
      this.catName=name
      this.categoryForm.patchValue({
        categoryName:name
      })
    }
  })

  }
  AddCategory(){
    const name=this.categoryForm.get("categoryName").value;
    if(this.id>0){
      this.categoryModel.id=this.id;
      this.categoryModel.categoryName=name;
      this.service.editCategory(this.categoryModel).subscribe(()=>{this.goList()})

    }else{
    if(this.categoryForm.valid){
      this.categoryModel.id=0;
      this.categoryModel.categoryName=name;
    this.service.AddCategory(this.categoryModel).subscribe(()=>{
    this.success="تم الاضافه بنجاح"
    this.categoryForm.reset();
    },(error)=>{
      this.error=error
    })
    }
  }

}
  iscategoryNameExist(){
    const cat=this.categoryForm.get("categoryName").value;

    for(let item of this.category){
      if(item.categoryName===cat &&!this.isEditMode){
        this.msg="اسم التصنيف موجود"
        return true;
       }//else if(!this.isEditMode||item.categoryName===cat||item.id!==this.categoryModel.id){
      //   this.msg="اسم التصنيف موجود"
      //   return true;}

  }
    return false;
  }
  getCategoryList(){
    this.service.getAllCategories().subscribe((data)=>{
      this.category=data
    })
  }
  goList(){
    sessionStorage.setItem("cat","cat");
    this.router.navigate(['controlpanel'])}
}
