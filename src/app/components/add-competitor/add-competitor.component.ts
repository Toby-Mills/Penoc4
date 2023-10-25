import { Output } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { Component, EventEmitter } from '@angular/core';
import { Competitor } from 'src/app/models/competitor';
import { PenocApiService } from 'src/app/services/penoc-api.service';

@Component({
  selector: 'app-add-competitor',
  templateUrl: './add-competitor.component.html',
  styleUrls: ['./add-competitor.component.css']
})
export class AddCompetitorComponent {
  public competitor: Competitor = new Competitor();
  @Output() newCompetitor: EventEmitter<Competitor> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  public constructor(
    public api: PenocApiService,
    public dialogRef: DialogRef
  ) { }

  onSaveClick() {
    this.api.addCompetitor(this.competitor).subscribe(newCompetitor => {
      this.newCompetitor.emit(newCompetitor);
      this.dialogRef.close();
    })
  }

  onCancelClick() {
    this.cancel.emit();
    this.dialogRef.close();
  }
}


