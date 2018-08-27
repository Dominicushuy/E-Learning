function DangKySerVice(){
	var validation = new Validation();
	this.DangKy = function(){
		$('#btnDangKy').click(function() {
			//lấy giá trị người dùng nhập vào
			var taiKhoan = $('#TaiKhoan').val();
			var matKhau = $('#MatKhau').val();
			var hoTen = $('#HoTen').val();
			var Email = $('#Email').val();
			var SoDT = $('#SoDT').val();
			var maNguoiDung = 'HV';

			//Validation 
			if (taiKhoan === '' || matKhau === '' || hoTen === '' || Email === '' || SoDT === '') {
			swal({
  				type: 'error',
  				text: 'Vui Lòng thử lại...',
  				title: 'Hãy Nhập tất cả các trường !',
				});              	
              return;
            } else if (!isNaN(hoTen)){
        	swal({
  				type: 'error',
  				text: 'Vui Lòng thử lại...',
  				title: 'Họ tên chỉ có thể là chữ !',
				});  
                return;
            } else if (!validation.KiemTraEmail(Email)) {
            swal({
  				type: 'error',
  				text: 'Vui Lòng thử lại...',
  				title: 'Hãy nhập đúng định dạng email. Ví dụ: Examp@gmail.com',
				});
                return;
            } else if (!validation.KiemTraSoDT(SoDT)) {
            swal({
  				type: 'error',
  				text: 'Vui Lòng thử lại...',
  				title: 'Số điện thoại phải là số và lớn hơn 10 chữ số',
				});
                
                return;
            } else {
                var nguoiDung = JSON.stringify({
                    TaiKhoan: taiKhoan,
                    MatKhau: matKhau,
                    HoTen: hoTen,
                    Email: Email,
                    SoDT: SoDT,
                    MaLoaiNguoiDung: maNguoiDung,
                });
            }

            //Gửi thông tin đăng ký lên server
            var urlAPI = "http://sv.myclass.vn/api/QuanLyTrungTam/DangKy";
            $.ajax({
            	url: urlAPI,
            	type: 'POST',
            	dataType: 'json',
            	contentType: "application/json",
            	data: nguoiDung,
            })
            .done(function(kq) {
            	console.log(kq);
            	if(kq === true){
            		swal({
  					position: 'center',
 					  type: 'success',
  					title: 'Đăng ký thành công',
  					showConfirmButton: false,
  					timer: 1000
				    });
            //Clear form
					  $(".clearForm").val('');
					   //Đóng form
    				$('.mfp-close').trigger('click');	
    				
            	} else if(kq === false) {
            	 swal({
  					   type: 'error',
  					   text: 'Vui Lòng tạo tài khoản khác...',
  					   title: 'Tài khoản đã tồn tại !!!',
				        });
            	}
            })
            .fail(function(kq) {
            	console.log(kq);
            	swal({
  					type: 'error',
  					text: 'Vui Lòng thử lại...',
  					title: 'Sập server rồi !!!',
				});
            });
            
		});
	}
}


