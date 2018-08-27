//Khởi tạo Danh Sách người dùng
var danhSachNguoiDung = new DanhSachNguoiDung();

//Validation
var validate = new Validation();

//Khởi tạo người dùng service
var nguoiDungService = new NguoiDungService();
nguoiDungService.LayDanhSachNguoiDung();


//Kiểm tra người dùng nhập 
function KiemTraNhap(){
	var taiKhoan = $('#TaiKhoan').val();
	var matKhau = $('#MatKhau').val();
	var hoTen = $('#HoTen').val();
	var Email = $('#Email').val();
	var SoDT = $('#SoDT').val();
	if(!isNaN(hoTen)){
		swal({
  			type: 'error',
  			text: 'Vui Lòng thử lại...',
  			title: 'Họ tên chỉ có thể là chữ !',
			});
		return;	  
	}else if (!validate.KiemTraEmail(Email)){
		swal({
  			type: 'error',
  			text: 'Vui Lòng thử lại...',
  			title: 'Hãy nhập đúng định dạng email. Ví dụ: Examp@gmail.com',
			});
		return;
	}else if (!validate.KiemTraSoDT(SoDT)){
		swal({
  			type: 'error',
  			text: 'Vui Lòng thử lại...',
  			title: 'Số điện thoại phải là số và lớn hơn 10 chữ số',
			});     
            return;
	}else {
    	var nguoiDung = JSON.stringify({
         	TaiKhoan: taiKhoan,
            MatKhau: matKhau,
            HoTen: hoTen,
            Email: Email,
            SoDT: SoDT,
            MaLoaiNguoiDung: 'HV',
            });
    	nguoiDungService.CapNhatThongTinNguoiDung(nguoiDung);
		
    }	
}

//Cập nhật thông tin học viên
$('#btnCapNhatTT').click(function(){
	KiemTraNhap();
});


