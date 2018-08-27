function DangNhapService(){

	this.DangNhap = function(){
		$('#btnDangNhap').click(function(){
			//Lấy giá trị nhạp vào
			var TKDangNhap = $('#TKDangNhap').val();
			var MKDangNhap = $('#MKDangNhap').val();

			//Gửi thông tin lên server
			var urlAPI = `http://sv.myclass.vn/api/QuanLyTrungTam/DangNhap?taikhoan=${TKDangNhap}&matkhau=${MKDangNhap}`;
			$.ajax({
				url: urlAPI,
				type: 'GET',
			})
			.done(function(kq) {
				var ThongTinTK = JSON.stringify(kq);
				localStorage.setItem("ThongTinTK", ThongTinTK);	
				localStorage.setItem("TaiKhoan",kq[0].TaiKhoan);
				for (var i = 0; i < kq.length; i++) {
					if(kq[i].MaLoaiNguoiDung === 'HV'){
						window.location.href = '../../views/MyCourse/index.html';
					}else if (kq[i].MaLoaiNguoiDung === 'GV') {
						window.location.href = '../../views/admin/examples/dashboard.html';			
					}else{
						swal({
  				      	type: 'error',
  						text: 'Vui Lòng thử lại...',
  						title: 'Tài khoản hoặc mật khẩu không đúng !',
						});  
					}		
				}
				 
			})
			.fail(function(kq) {
				console.log(kq);
				swal({
  				      	type: 'error',
  						text: 'Vui Lòng thử lại...',
  						title: 'Lỗi Mạng !',
						});  
			})
			
		})
	}
}

DangNhapService.prototype.LogOut = function(){
	$('#btnLogOut').click(function(){
		localStorage.removeItem("ThongTinTK");
		localStorage.removeItem("TaiKhoan");
		localStorage.removeItem('MaKhoaHoc');
	});
	$('#btnDangXuat').click(function(){
		localStorage.removeItem("ThongTinTK");
		localStorage.removeItem("TaiKhoan");
		localStorage.removeItem('MaKhoaHoc');
	})
};