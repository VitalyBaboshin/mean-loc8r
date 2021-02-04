import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpService} from "../../services/http.service";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  selectedValue: number;
  dialogTitle: string;
  stars = [1,2,3,4,5];
  text: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: string,
    private dialogRef: MatDialogRef<[number, string]>
  ) { }


  ngOnInit(): void {
    this.dialogTitle = this.data;
  }


  saveReview() {
    console.log(this.selectedValue, ' ', this.text)
    this.dialogRef.close([this.selectedValue, this.text])
  }
}
