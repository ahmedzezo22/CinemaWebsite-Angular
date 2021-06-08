import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/AdminServices/admin.service';
import { subCategory } from 'src/app/models/subCategory';
import * as $ from 'jquery';


@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {
  category: subCategory[]
  item: number;
  msg: string;
  constructor(private router: Router, private service: AdminService) { }

  ngOnInit(): void {
    this.category = [];
    this.msg = ''
    this.item = 0;
    this.getCategoryList();
  }
  getCategoryList() {
    this.service.getAllSubCategories().subscribe((data) => {
      this.category = data
    })
  }

  selectAll() {
    {
      var tbl = $('#tbl');
      var header = tbl.find('thead .ckheader');
      var item = tbl.find('tbody .ckitem');

      $(function () {
        item.on('change', function () {
          if ($(this).is(':checked')) {
            $(this).closest('tr').addClass('NewRowColor');
          }
          else {
            $(this).closest('tr').removeClass('NewRowColor');
          }
        });

        header.change(function () {
          var c = this.checked;
          item.prop("checked", c);
          item.trigger('check');
          if ($(this).is(':checked')) {
            $(item).closest('tr').addClass('NewRowColor');
          }
          else {
            $(item).closest('tr').removeClass('NewRowColor');
          }
        });
      });
    }
  }
  editCategory(id: number, name: string, cId) {
    this.router.navigate(['/editsubcategory', id, name, cId])
  }
  deleteCategory(id: number) {

  }
  isDelete() {
    var checkboxes = document.getElementsByClassName('ckitem');
    if (checkboxes.length > 0) {
      for (let i = 0; i < checkboxes.length; i++) {
        if ($(checkboxes[i]).is(":checked")) {
          return true;
        }
      }
    }
    return false;
  }
  DeleteCount() {
    var count = $('.ckitem:checked').length;
    this.item = count;
  }
  deleteConfirm() {
    var checkBox = document.getElementsByClassName('ckitem')
    var ids = []
    if (checkBox.length > 0) {
      for (let i = 0; i < checkBox.length; i++) {
        if ($(checkBox[i]).is(":checked")) {
          var id = $(checkBox[i]).val();
          console.log(id)
          ids.push(id);
        }
      }
      

      this.service.deleteAllSubCategory(ids).subscribe(() => {
        this.msg = "تم الحذف بنجاح"
        this.getCategoryList();
        $("#btnclose").trigger("click");
      }, (err) => { console.log(err) })
    }
  }
}
