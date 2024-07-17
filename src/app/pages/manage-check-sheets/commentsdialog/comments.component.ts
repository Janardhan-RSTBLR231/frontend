import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input() title: string;
  comments: string;
  commentForm: FormGroup;
  reqcomt: any;
  constructor(protected ref: NbDialogRef<CommentsComponent>,
    private fb: FormBuilder) {
    this.commentForm = this.fb.group({
      comments: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.title === "Enter Change Details") {
      this.reqcomt = "Change Details"
    }
    else if (this.title === "Please provide the reason for Rejection")
    {
      this.reqcomt="Reject Comments"
      }
  }
  cancel(): void {
    this.ref.close();
  }
  submit() {
    if (this.commentForm.valid) {
      this.comments = this.commentForm.get('comments')?.value
      this.ref.close({ comments: this.comments });
    }
    else
    {
      this.commentForm.markAllAsTouched();
      }
  }


}
