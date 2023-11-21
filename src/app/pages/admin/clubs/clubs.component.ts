import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ToastMessageType } from 'src/app/components/toaster/toaster.component';
import { Club } from 'src/app/models/club';
import { DataCacheService } from 'src/app/services/data-cache.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.css']
})
export class ClubsComponent {
  public clubs: Club[] = [];
  public editingClub: Club | undefined;
  @ViewChild('dialogContent') dialogTemplate!: TemplateRef<any>;

  public constructor(
    private dataService: DataCacheService,
    private dialog: Dialog,
    private toaster: ToasterService,
  ) { }

  ngOnInit() {
    this.loadClubs();
  }

  private loadClubs() {
    this.dataService.getClubs().subscribe(clubs => {
      this.clubs = clubs;
    });
  }

  onEditClick(clubId: number) {
    this.editingClub = { ...this.clubs.find(club => club.id === clubId)! };
    this.dialog.open(this.dialogTemplate);
  }

  onSaveClick(dialogRef: DialogRef) {

    if (this.editingClub!.id! > 0) {
      this.dataService.updateClub(this.editingClub!).subscribe(data => this.editingClub = undefined);
      dialogRef.close();
    } else {
      this.dataService.addClub(this.editingClub!).subscribe(data => this.editingClub = undefined);
      dialogRef.close();
    }
  }

  onCancelClick(dialogRef: DialogRef) {
    this.editingClub = undefined;
    dialogRef.close();
  }

  onDeleteClick(clubId: number) {
    this.dataService.deleteClub(clubId).subscribe(
      {
        error: error => {this.toaster.showToast(`Failed to delete club. There may be one or more events or results associated. Error: ${error.message}`, ToastMessageType.Failure, 0) }
      }
    );
  }

  onNewClick() {
    this.editingClub = new Club();
    this.dialog.open(this.dialogTemplate);
  }
}
