import {ViewChild, Component, OnInit} from '@angular/core';
import {FileService} from "./services/file.service";
import {AuthenticationService} from "../auth/services/authentication.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {ShowToastrService} from "../services/showtoast.service";


@Component({
  selector: 'app-frontend-main',
  templateUrl: './frontend-main.component.html',
  styleUrls: ['./frontend-main.component.css']
})

export class FrontendMainComponent implements OnInit{
  displayedColumns: string[] = ['FECHA', 'SUBIDO POR', 'NOMBRE', 'EXTENSIÓN', 'TAMAÑO', 'ACCIONES'];
  dataSource: any;
  list_count=0;
  previous=null;
  next=null;
  filename='';
  file:any;
  @ViewChild('fileid', {static: false})
  InputVar: any;
  fileLoading=false;
  tableLoading=false;
  user:any;
  filter='';

  constructor(
    private fileService: FileService,
    private authService:AuthenticationService,
    private toastr: ToastrService,
    private showToastr: ShowToastrService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.dataload(null, this.filter);
    this.user = this.authService.getUser()
  }

  dataload(url:string | null, filter:string | null): void {
    this.tableLoading = true;
    this.fileService.getFiles(url, filter).subscribe(resp => {
      this.dataSource = resp.results;
      this.previous = resp.previous;
      this.next = resp.next;
      this.list_count = resp.count;
      this.tableLoading = false;
    }, error => {
      this.authService.logout();
      this.showToastr.showInfo('Ya expiró la session.', 'Ups!!');
      this.router.navigate(['/access/login']);
      this.tableLoading = false;
    })
  }
  moveToPageNext(): void {
    this.dataload(this.next, this.filter);
  }
  moveToPagePrevious(): void {
    this.dataload(this.previous, this.filter);
  }

  onFileSelected(event:any) {
    // todo validar nombre de fichero

    const file:File = event.target.files[0];
    if(file.size < 104857600){
      this.file = file;
    } else {
      this.showToastr.showInfo('Hasta 100 megas por favor.', 'Pesa mucho!!!');
      this.cleanFileInput();
    }
  }

  fileUpload() {
    this.fileLoading = true;
    const self = this;
    setTimeout(function(){
    // for simulate the upload file, in a real server, quit setTimeout
    if(self.file) {
      const formData = new FormData();
      formData.append('file', self.file, self.file.name);
      const user_id = localStorage.getItem('id' ) || '1';
      formData.append('uploaded_by', user_id);
      self.fileService.createFile(formData).subscribe(resp => {
        self.showToastr.showSucces('Fichero subido al server', 'INFO!');
        self.dataload(null, self.filter);
        self.cleanFileInput();
        self.fileLoading = false;
      }, error => {
        if (error?.error?.msg) {
          self.showToastr.showError(error.error.msg, 'Error!');
        } else {
          self.showToastr.showError('Fichero no subido, contacte con el admon', 'Error!');
        }
        self.fileLoading = false;
        self.cleanFileInput();
      })
    }
    }, 2000);
  }

  fileDelete(id:string) {
    const result = confirm("¿Desea eliminar el fichero? La información no podrá restarurarse");
    if (result) {
      this.tableLoading = true;
      this.fileService.deleteFile(id).subscribe(resp =>{
        this.showToastr.showInfo('Fichero eliminado', 'INFO!');
        this.dataload(null, this.filter);
        this.tableLoading = false;
      }, error => {
        this.showToastr.showError('Fichero no eliminado, contacte con el admon', 'Error!');
        this.tableLoading = false;
      })
    }
  }

  cleanFileInput(): void {
    this.file = null;
    this.InputVar.nativeElement.value = ''
  }

  activeEditFileName(id:string) {
    const edit_file_id = 'file_edit_id_' + id;
    let edit_file = document.getElementById(edit_file_id);
    edit_file!.hidden = true;
    const input_file_id = 'file_id_' + id;
    let input_file = document.getElementById(input_file_id);
    input_file!.hidden = false;
    const file_id = 'file_' + id;
    let file_name = document.getElementById(file_id);
    file_name!.hidden = true;
  }

  inactiveFileName(id:string) {
    const edit_file_id = 'file_edit_id_' + id;
    let edit_file = document.getElementById(edit_file_id);
    edit_file!.hidden = false;
    const input_file_id = 'file_id_' + id;
    let input_file = document.getElementById(input_file_id);
    input_file!.hidden = true;
    const file_id = 'file_' + id;
    let file_name = document.getElementById(file_id);
    file_name!.hidden = false;
  }

  changeFileName(id:string) {
    this.tableLoading = true;
    const filename = document.getElementById('file_name_id_' + id) as HTMLInputElement;
    let download_element = document.getElementById('download_file_id_' + id) as HTMLLinkElement;
    const fileExt = document.getElementById('file_ext_' + id) as HTMLSpanElement;
    this.fileService.changeFileName(id, filename.value, fileExt.innerHTML).subscribe(resp => {
      let new_name = document.getElementById('file_' + id) as HTMLSpanElement;
      const old_filename = new_name.innerHTML;
      new_name.innerHTML = filename.value;
      this.inactiveFileName(id);
      this.showToastr.showSucces("Nombre del fichero cambiado exitosamente!", "Super!!");
      let aux = download_element.href;
      download_element.href = aux.replace(`${old_filename}.${fileExt.innerHTML}`, `${filename.value}.${fileExt.innerHTML}`);
      this.tableLoading = false;
    }, error => {
      this.showToastr.showInfo(error.error.msg, "Ups!!");
      this.tableLoading = false;
    })
  }
  applyFilter(event:any) {
    this.filter = (event.target as HTMLInputElement).value;
    this.dataload(null, this.filter);
  }
}

