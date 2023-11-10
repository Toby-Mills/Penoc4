import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ToastMessageType } from 'src/app/components/toaster/toaster.component';
import { Venue } from 'src/app/models/venue';
import { DataCacheService } from 'src/app/services/data-cache.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-venues',
  templateUrl: './venues.component.html',
  styleUrls: ['./venues.component.css']
})
export class VenuesComponent {
  public venues: Venue[] = [];
  public editingVenue: Venue | undefined;
  @ViewChild('dialogContent') dialogTemplate!: TemplateRef<any>;

  public constructor(
    private dataService: DataCacheService,
    private dialog: Dialog,
    private toaster: ToasterService,
  ) { }

  ngOnInit() {
    this.loadVenues();
  }


  private loadVenues() {
    this.dataService.getVenues().subscribe(venues => {
      let sortedVenues = venues.sort((venueA, venueB) => {
        if (venueA.name > venueB.name) { return 1 }
        else if (venueB.name > venueA.name) { return -1 }
        else { return 0 }
      })
      this.venues = sortedVenues;
    });
  }

  onEditClick(venueId: number) {
    this.editingVenue = { ...this.venues.find(venue => venue.id === venueId)! };

    const dialogRef = this.dialog.open(this.dialogTemplate);
  }

  onSaveClick(dialogRef: DialogRef) {

    if (this.editingVenue!.id > 0) {
      this.dataService.updateVenue(this.editingVenue!).subscribe(data => this.editingVenue = undefined);
      dialogRef.close();
    } else {
      this.dataService.addVenue(this.editingVenue!).subscribe(data => this.editingVenue = undefined);
      dialogRef.close();
    }
  }

  onCancelClick(dialogRef: DialogRef) {
    this.editingVenue = undefined;
    dialogRef.close();
  }

  onDeleteClick(venueId: number) {
    this.dataService.deleteVenue(venueId).subscribe(
      {
        error: error => { this.toaster.showToast('Failed to delete venue. There may be one or more events associated', ToastMessageType.Failure, 0) }
      }
    );
  }

  onNewClick() {
    this.editingVenue = new Venue();
    this.dialog.open(this.dialogTemplate);
  }
}