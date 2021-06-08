import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/AdminServices/admin.service';
import { Caregory } from 'src/app/models/categoryModel';
import { subCategory } from 'src/app/models/subCategory';

@Component({
  selector: 'app-add-sub-category',
  templateUrl: './add-sub-category.component.html',
  styleUrls: ['./add-sub-category.component.css']
})
export class AddSubCategoryComponent implements OnInit {

isEditMode:boolean
success:string;
error:string
title:string;
msg:string;
btn:string
category:Caregory[]
categoryModel:subCategory;
 id:number
subcategoryForm:FormGroup
catName:string
  constructor(private fb:FormBuilder,private service:AdminService,private activateRoute:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    // this.id=0
   this.isEditMode=false;
    this.categoryModel={
      id:0,
      subCategoryName:"",
      category:{
        id:0,
        categoryName:''
      },
      categoryId:0
    }
    this.title=""
    this.msg=""
    this.btn=""
    this.category=[]
    this.getCategoryList();  
   this.subcategoryForm= this.fb.group({
      "categoryName":['',[Validators.required,Validators.maxLength(250)]],
      "catId":[0,[Validators.required]]
    })
    this.success=""
    this.error=""
   
   this.activateRoute.paramMap.subscribe((param)=>{
    var subId=parseInt(param.get('id'));
    var subName=param.get('id1');
    var catId=param.get('id2');
    if(!subId&&!subName&&!catId){
      this.title="اضافة تصنيف فرعى جديد"
      this.btn="اضافه"
      this.isEditMode=false;
       this.id=0;
    }else{
      this.isEditMode=true
      this.title="تعديل التصنيف"
      this.btn="تعديل"
       this.id=subId;
      this.catName=subName
      this.subcategoryForm.patchValue({
        categoryName:subName,
        catId:catId
      })
    }
  })
   
  }
  AddSubCategory(){
    const name=this.subcategoryForm.get("categoryName").value;
    const catId=this.subcategoryForm.get("catId").value;
   
    if(this.id>0){
      this.categoryModel.id=this.id;
      this.categoryModel.subCategoryName=name;
      this.categoryModel.categoryId=catId;
      this.categoryModel.category.categoryName="hrllo"
      this.service.editSubCategory(this.categoryModel).subscribe(()=>{this.goList()})

    }else{
     if(this.subcategoryForm.valid){
      
      this.categoryModel.id=0;
      this.categoryModel.subCategoryName=name;
      this.categoryModel.categoryId=catId;
      this.categoryModel.category.id=catId;
      this.categoryModel.category.categoryName=document.getElementById("select").innerText

    this.service.AddSubCategory(this.categoryModel).subscribe(()=>{
    this.success="تم الاضافه بنجاح"
    this.subcategoryForm.reset();
    },(error)=>{
console.log(error)
    })
    
  }
    }
}
isSubcategoryNameExist(){
  //   const cat=this.categoryForm.get("categoryName").value;
    
  //   for(let item of this.category){
  //     if(item.categoryName===cat &&!this.isEditMode){
  //       this.msg="اسم التصنيف موجود"
  //       return true;
  //      }else if(!this.isEditMode||item.categoryName===cat||item.id!==this.categoryModel.id){
  //        this.msg="اسم التصنيف موجود"
  //        return true;}
    
  // }
  //   return false;
  }
  getCategoryList(){
    this.service.getAllCategories().subscribe((data)=>{
      this.category=data
    })
  }
  goList(){
    sessionStorage.setItem("cat1","Cat");
    this.router.navigate(['controlpanel'])}

}
