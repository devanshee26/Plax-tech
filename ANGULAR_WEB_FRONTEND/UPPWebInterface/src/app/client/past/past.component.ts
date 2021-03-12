import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {PlacementService} from '../../services/placement.service';
import {ActivatedRoute} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';

export interface Record {
  company_name: string;
  designation: string;
  candidates_hired: number;
  location: string;
  website: string;
  year: string;
  average_package: number;
  highest_package: number;
}

@Component({
  selector: 'app-past',
  templateUrl: './past.component.html',
  styleUrls: ['./past.component.css']
})

export class PastComponent implements AfterViewInit {

  public status: boolean;
  public displayedColumns: string[] = ['Company Name', 'Designation', 'Candidates Hired', 'Location', 'Website', 'Year', 'Average Package (LPA)', 'Highest Package (LPA)'];
  public dataSource: any;
  @ViewChild(MatPaginator)
  // @ts-ignore
  public paginator: MatPaginator;
  public data: Record[];

  constructor(private placementService: PlacementService,
              private activatedRoute: ActivatedRoute) {
    this.status = true;
    this.data = [];
  }

  ngAfterViewInit(): void {
    this.placementService.get('past').subscribe((value => {
      this.data = value;
      console.log(this.data);
      this.dataSource = new MatTableDataSource<Record>(this.data);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.status = false;
    }));
  }

}
