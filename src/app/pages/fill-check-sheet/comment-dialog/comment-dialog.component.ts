import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.scss']
})
export class CommentDialogComponent implements OnInit {
  commentForm: FormGroup;
  comment: string;
  constructor(protected dialogRef: NbDialogRef<CommentDialogComponent>,
    private formBuilder: FormBuilder) {
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.required]
    });
     }

  ngOnInit(): void {
  }
  get commentControl() {
    return this.commentForm.get('comment');
  }
  submitComment() {
    if (this.commentForm.valid) {
      this.comment= this.commentForm.value.comment
      this.dialogRef.close({ comment: this.comment });
    } else {
      this.commentControl.markAllAsTouched();
    }
  }
  cancel(): void {
    this.comment = "";
    this.dialogRef.close({ comment: this.comment });
  }
}
