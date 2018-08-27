$(document).ready(function() {
	//Khởi tạo danh sách người dung, danh sách học viên, học viên Sẻvice
var danhSachNguoiDung = new DanhSachNguoiDung();
var danhSachHocVien = new DanhSachHocVien();


var hocVienService = new HocVienService();
hocVienService.LayDanhSachHocVien();

	//set LocalStorage  danh sách học viên
function SetStorage(){
    var jsonDanhSachHocVien = JSON.stringify(danhSachHocVien.DSHV);
    localStorage.setItem("DanhSachHV", jsonDanhSachHocVien);
}

function GetStorage(){
    var jsonDanhSachHocVien = localStorage.getItem("DanhSachHV");
    var mangDSHV = JSON.parse(jsonDanhSachHocVien);
    danhSachHocVien.DSHV = mangDSHV;
    LoadTableDSHV(danhSachHocVien);
}


	//Load table Danh sách học viên
	function LoadTableDSHV(DSHV) {
	var DSHVJSon = localStorage.getItem("DanhSachHV");
	var DSHV = JSON.parse(DSHVJSon);
	var noiDungDSHV = '';

	for (var i = 0; i < DSHV.length; i++) {
		var hocVien = DSHV[i];
			noiDungDSHV+=
			`<tr class="trThongTinNguoiDung">
			<td><input class="CkbXoaNguoiDung" type="checkbox" value="${hocVien.TaiKhoan}"></td>
			<td>${hocVien.TaiKhoan}</td>
			<td class="tdHoTen">${hocVien.HoTen}</td>
			<td>${hocVien.Email}</td>
			<td>${hocVien.SoDT}</td>
			<td>${hocVien.MaLoaiNguoiDung}</td>
			</tr>
			`;	
		}		
	$('#tbodyDSHV').html(noiDungDSHV);
}

GetStorage();


	//Tìm học viên theo tên
	$('#txtTimKiem').keyup(function() {
    var value = $(this).val().toUpperCase().trim();
    var trTable = $('tr');
    for (var i = 0; i < trTable.length; i++) {
        tdTable = trTable[i].getElementsByTagName('td')[2];
        if(tdTable){
            if(tdTable.innerHTML.toUpperCase().indexOf(value) >-1){
                trTable[i].style.display = "";
            }else {
                trTable[i].style.display = "none";
            }
        }
    }

});
	











});