$(document).ready(function() {
	 CKEDITOR.replace( 'txtMota' );
	var DSNguoiDung = new DanhSachNguoiDung();

// Su kien lay du lieu tu XML
	$('#btnGet').bind('click',function(){
		// $('#noidung').load('../../../text.txt');
		$.ajax({
			url: '../../../DanhSachNguoiDung.xml',
			type: 'GET',
			dataType: 'xml'
		})
		.done(function(kq) {
			var mangNguoiDung = $(kq).find('NguoiDung');
			$(mangNguoiDung).each(function() {
				var taiKhoan = $(this).find('TaiKhoan').text();
				var matKhau = $(this).find('MatKhau').text();
				var hoTen = $(this).find('HoTen').text();
				var soDT = $(this).find('SoDT').text();
				var nguoiDung = new NguoiDung(taiKhoan,matKhau,hoTen,soDT);
				DSNguoiDung.ThemNguoiDung(nguoiDung);
			});
			LoadDanhSachNguoiDung(DSNguoiDung.DSND);
		})
		.fail(function(kq) {
			console.log("kq");
		})
	})

	//Su kien lay du lieu tu file JSON
	$('#btnGetJson').bind('click',function() {
		$.ajax({
			url: '../../../DanhSachNguoiDung.json',
			type: 'GET',
			dataType:'json',
		})
		.done(function(kq){
			DSNguoiDung = kq;
			LoadDanhSachNguoiDung(DSNguoiDung.DSND);
		})
		.fail(function(kq){
			console.log(kq);
		});
		
	});




	//Tao bang
	function LoadDanhSachNguoiDung(DSND){
		var noiDungDSND = "";
		for(var i = 0; i < DSND.length; i++){
			var nguoiDung = DSND[i];
			noiDungDSND += `
			<tr class="trThongTinNguoiDung" 
			data-taikhoan1="${nguoiDung.TaiKhoan}"
			data-matKhau="${nguoiDung.MatKhau}"
			data-hoTen="${nguoiDung.HoTen}"
			data-email="${nguoiDung.Email}"
			data-soDt="${nguoiDung.SoDT}"
			>
			<td><input class="CkbXoaNguoiDung" type="checkbox" value="${nguoiDung.TaiKhoan}"></td>
			<td>${nguoiDung.TaiKhoan}</td>
			<td>${nguoiDung.MatKhau}</td>
			<td class="tdHoTen">${nguoiDung.HoTen}</td>
			<td>${nguoiDung.Email}</td>
			<td>${nguoiDung.SoDT}</td>
			<td>
			<button class="btn btn-info btnXoa" data-taikhoan="${nguoiDung.TaiKhoan}">Xóa</button>
			<button class="btn btn-warning btnCapNhat" data-taikhoan="${nguoiDung.TaiKhoan}">Sửa</button>
			</td>
			</tr>
			`;
		}
		$('#tbodyDSND').html(noiDungDSND);
	}
});