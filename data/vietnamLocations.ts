export interface Province {
  id: string;
  name: string;
  districts: string[];
}

export const VIETNAM_PROVINCES: Province[] = [
  {
    id: 'hanoi',
    name: 'Thành phố Hà Nội',
    districts: [
      'Quận Ba Đình', 'Quận Hoàn Kiếm', 'Quận Tây Hồ', 'Quận Long Biên',
      'Quận Cầu Giấy', 'Quận Đống Đa', 'Quận Hai Bà Trưng', 'Quận Hoàng Mai',
      'Quận Thanh Xuân', 'Huyện Sóc Sơn', 'Huyện Đông Anh', 'Huyện Gia Lâm',
      'Quận Nam Từ Liêm', 'Huyện Thanh Trì', 'Quận Bắc Từ Liêm', 'Huyện Mê Linh',
      'Quận Hà Đông', 'Thị xã Sơn Tây', 'Huyện Ba Vì', 'Huyện Phúc Thọ',
      'Huyện Đan Phượng', 'Huyện Hoài Đức', 'Huyện Quốc Oai', 'Huyện Thạch Thất',
      'Huyện Chương Mỹ', 'Huyện Thanh Oai', 'Huyện Thường Tín', 'Huyện Phú Xuyên',
      'Huyện Ứng Hòa', 'Huyện Mỹ Đức'
    ],
  },
  {
    id: 'hcm',
    name: 'Thành phố Hồ Chí Minh',
    districts: [
      'Thành phố Thủ Đức', 'Quận 1', 'Quận 3', 'Quận 4', 'Quận 5', 'Quận 6',
      'Quận 7', 'Quận 8', 'Quận 10', 'Quận 11', 'Quận 12', 'Quận Bình Thạnh',
      'Quận Gò Vấp', 'Quận Phú Nhuận', 'Quận Tân Bình', 'Quận Tân Phú',
      'Quận Bình Tân', 'Huyện Củ Chi', 'Huyện Hóc Môn', 'Huyện Bình Chánh',
      'Huyện Nhà Bè', 'Huyện Cần Giờ'
    ],
  },
  {
    id: 'danang',
    name: 'Thành phố Đà Nẵng',
    districts: [
      'Quận Hải Châu', 'Quận Thanh Khê', 'Quận Sơn Trà', 'Quận Ngũ Hành Sơn',
      'Quận Liên Chiểu', 'Quận Cẩm Lệ', 'Huyện Hòa Vang', 'Huyện Hoàng Sa'
    ],
  },
  {
    id: 'haiphong',
    name: 'Thành phố Hải Phòng',
    districts: [
      'Quận Hồng Bàng', 'Quận Ngô Quyền', 'Quận Lê Chân', 'Quận Hải An',
      'Quận Kiến An', 'Quận Đồ Sơn', 'Quận Dương Kinh', 'Huyện Thuỷ Nguyên',
      'Huyện An Dương', 'Huyện An Lão', 'Huyện Kiến Thuỵ', 'Huyện Tiên Lãng',
      'Huyện Vĩnh Bảo', 'Huyện Cát Hải', 'Huyện Bạch Long Vĩ'
    ],
  },
  {
    id: 'cantho',
    name: 'Thành phố Cần Thơ',
    districts: [
      'Quận Ninh Kiều', 'Quận Ô Môn', 'Quận Bình Thủy', 'Quận Cái Răng',
      'Quận Thốt Nốt', 'Huyện Vĩnh Thạnh', 'Huyện Cờ Đỏ', 'Huyện Phong Điền',
      'Huyện Thới Lai'
    ],
  },
  {
    id: 'angiang',
    name: 'Tỉnh An Giang',
    districts: ['Thành phố Long Xuyên', 'Thành phố Châu Đốc', 'Thị xã Tân Châu', 'Huyện An Phú', 'Huyện Tịnh Biên', 'Huyện Tri Tôn', 'Huyện Châu Phú', 'Huyện Châu Thành', 'Huyện Chợ Mới', 'Huyện Thoại Sơn'],
  },
  {
    id: 'brvt',
    name: 'Tỉnh Bà Rịa - Vũng Tàu',
    districts: ['Thành phố Vũng Tàu', 'Thành phố Bà Rịa', 'Thị xã Phú Mỹ', 'Huyện Châu Đức', 'Huyện Xuyên Mộc', 'Huyện Long Điền', 'Huyện Đất Đỏ', 'Huyện Côn Đảo'],
  },
  {
    id: 'bacgiang',
    name: 'Tỉnh Bắc Giang',
    districts: ['Thành phố Bắc Giang', 'Thị xã Việt Yên', 'Huyện Hiệp Hòa', 'Huyện Lạng Giang', 'Huyện Lục Nam', 'Huyện Lục Ngạn', 'Huyện Sơn Động', 'Huyện Tân Yên', 'Huyện Yên Dũng', 'Huyện Yên Thế'],
  },
  {
    id: 'backan',
    name: 'Tỉnh Bắc Kạn',
    districts: ['Thành phố Bắc Kạn', 'Huyện Pác Nặm', 'Huyện Ba Bể', 'Huyện Ngân Sơn', 'Huyện Chợ Đồn', 'Huyện Chợ Mới', 'Huyện Na Rì', 'Huyện Bạch Thông'],
  },
  {
    id: 'baclieu',
    name: 'Tỉnh Bạc Liêu',
    districts: ['Thành phố Bạc Liêu', 'Thị xã Giá Rai', 'Huyện Hồng Dân', 'Huyện Phước Long', 'Huyện Vĩnh Lợi', 'Huyện Đông Hải', 'Huyện Hoà Bình'],
  },
  {
    id: 'bacninh',
    name: 'Tỉnh Bắc Ninh',
    districts: ['Thành phố Bắc Ninh', 'Thành phố Từ Sơn', 'Thị xã Thuận Thành', 'Thị xã Quế Võ', 'Huyện Yên Phong', 'Huyện Tiên Du', 'Huyện Gia Bình', 'Huyện Lương Tài'],
  },
  {
    id: 'bentre',
    name: 'Tỉnh Bến Tre',
    districts: ['Thành phố Bến Tre', 'Huyện Châu Thành', 'Huyện Chợ Lách', 'Huyện Mỏ Cày Nam', 'Huyện Giồng Trôm', 'Huyện Bình Đại', 'Huyện Ba Tri', 'Huyện Thạnh Phú', 'Huyện Mỏ Cày Bắc'],
  },
  {
    id: 'binhdinh',
    name: 'Tỉnh Bình Định',
    districts: ['Thành phố Quy Nhơn', 'Thị xã An Nhơn', 'Thị xã Hoài Nhơn', 'Huyện An Lão', 'Huyện Hoài Ân', 'Huyện Vĩnh Thạnh', 'Huyện Tây Sơn', 'Huyện Phù Cát', 'Huyện Phù Mỹ', 'Huyện Tuy Phước', 'Huyện Vân Canh'],
  },
  {
    id: 'binhduong',
    name: 'Tỉnh Bình Dương',
    districts: ['Thành phố Thủ Dầu Một', 'Thành phố Dĩ An', 'Thành phố Thuận An', 'Thành phố Tân Uyên', 'Thành phố Bến Cát', 'Huyện Bàu Bàng', 'Huyện Dầu Tiếng', 'Huyện Phú Giáo', 'Huyện Bắc Tân Uyên'],
  },
  {
    id: 'binhphuoc',
    name: 'Tỉnh Bình Phước',
    districts: ['Thành phố Đồng Xoài', 'Thị xã Bình Long', 'Thị xã Phước Long', 'Thị xã Chơn Thành', 'Huyện Bù Đốp', 'Huyện Bù Đăng', 'Huyện Bù Gia Mập', 'Huyện Đồng Phú', 'Huyện Hớn Quản', 'Huyện Lộc Ninh', 'Huyện Phú Riềng'],
  },
  {
    id: 'binhthuan',
    name: 'Tỉnh Bình Thuận',
    districts: ['Thành phố Phan Thiết', 'Thị xã La Gi', 'Huyện Tuy Phong', 'Huyện Bắc Bình', 'Huyện Hàm Thuận Bắc', 'Huyện Hàm Thuận Nam', 'Huyện Tánh Linh', 'Huyện Đức Linh', 'Huyện Hàm Tân', 'Huyện Phú Quý'],
  },
  {
    id: 'camau',
    name: 'Tỉnh Cà Mau',
    districts: ['Thành phố Cà Mau', 'Huyện Đầm Dơi', 'Huyện Ngọc Hiển', 'Huyện Cái Nước', 'Huyện Trần Văn Thời', 'Huyện U Minh', 'Huyện Thới Bình', 'Huyện Năm Căn', 'Huyện Phú Tân'],
  },
  {
    id: 'caobang',
    name: 'Tỉnh Cao Bằng',
    districts: ['Thành phố Cao Bằng', 'Huyện Bảo Lạc', 'Huyện Bảo Lâm', 'Huyện Hạ Lang', 'Huyện Hà Quảng', 'Huyện Hòa An', 'Huyện Nguyên Bình', 'Huyện Quảng Hòa', 'Huyện Thạch An', 'Huyện Trùng Khánh'],
  },
  {
    id: 'daklak',
    name: 'Tỉnh Đắk Lắk',
    districts: ['Thành phố Buôn Ma Thuột', 'Thị xã Buôn Hồ', 'Huyện Ea H\'leo', 'Huyện Ea Súp', 'Huyện Krông Năng', 'Huyện Krông Búk', 'Huyện Krông Định', 'Huyện Cư M\'gar', 'Huyện Cư Kuin', 'Huyện M\'Drắk'],
  },
  {
    id: 'daknong',
    name: 'Tỉnh Đắk Nông',
    districts: ['Thành phố Gia Nghĩa', 'Huyện Đắk Glong', 'Huyện Đắk Mil', 'Huyện Đắk R\'lấp', 'Huyện Đắk Song', 'Huyện Krông Nô', 'Huyện Tuy Đức', 'Huyện Cư Jút'],
  },
  {
    id: 'dienbien',
    name: 'Tỉnh Điện Biên',
    districts: ['Thành phố Điện Biên Phủ', 'Thị xã Mường Lay', 'Huyện Điện Biên', 'Huyện Điện Biên Đông', 'Huyện Mường Chà', 'Huyện Mường Nhé', 'Huyện Mường Áng', 'Huyện Nậm Pồ', 'Huyện Tủa Chùa', 'Huyện Tuần Giáo'],
  },
  {
    id: 'dongnai',
    name: 'Tỉnh Đồng Nai',
    districts: ['Thành phố Biên Hòa', 'Thành phố Long Khánh', 'Huyện Long Thành', 'Huyện Nhơn Trạch', 'Huyện Trảng Bom', 'Huyện Thống Nhất', 'Huyện Cẩm Mỹ', 'Huyện Vĩnh Cửu', 'Huyện Xuân Lộc', 'Huyện Định Quán', 'Huyện Tân Phú'],
  },
  {
    id: 'dongthap',
    name: 'Tỉnh Đồng Tháp',
    districts: ['Thành phố Cao Lãnh', 'Thành phố Sa Đéc', 'Thành phố Hồng Ngự', 'Huyện Tân Hồng', 'Huyện Hồng Ngự', 'Huyện Tam Nông', 'Huyện Tháp Mười', 'Huyện Cao Lãnh', 'Huyện Thanh Bình', 'Huyện Lấp Vò', 'Huyện Lai Vung', 'Huyện Châu Thành'],
  },
  {
    id: 'gialai',
    name: 'Tỉnh Gia Lai',
    districts: ['Thành phố Pleiku', 'Thị xã An Khê', 'Thị xã Ayun Pa', 'Huyện Chư Păh', 'Huyện Chư Prông', 'Huyện Chư Sê', 'Huyện Đắk Đoa', 'Huyện Đắk Pơ', 'Huyện Đức Cơ', 'Huyện Ia Grai', 'Huyện Ia Pa', 'Huyện KBang', 'Huyện Kông Chro', 'Huyện Krông Pa', 'Huyện Mang Yang', 'Huyện Phú Thiện'],
  },
  {
    id: 'hagiang',
    name: 'Tỉnh Hà Giang',
    districts: ['Thành phố Hà Giang', 'Huyện Đồng Văn', 'Huyện Mèo Vạc', 'Huyện Yên Minh', 'Huyện Quản Bạ', 'Huyện Vị Xuyên', 'Huyện Bắc Mê', 'Huyện Hoàng Su Phì', 'Huyện Xín Mần', 'Huyện Bắc Quang', 'Huyện Quang Bình'],
  },
  {
    id: 'hanam',
    name: 'Tỉnh Hà Nam',
    districts: ['Thành phố Phủ Lý', 'Thị xã Duy Tiên', 'Huyện Kim Bảng', 'Huyện Thanh Liêm', 'Huyện Bình Lục', 'Huyện Lý Nhân'],
  },
  {
    id: 'hatinh',
    name: 'Tỉnh Hà Tĩnh',
    districts: ['Thành phố Hà Tĩnh', 'Thị xã Hồng Lĩnh', 'Thị xã Kỳ Anh', 'Huyện Cẩm Xuyên', 'Huyện Can Lộc', 'Huyện Đức Thọ', 'Huyện Hương Khê', 'Huyện Hương Sơn', 'Huyện Kỳ Anh', 'Huyện Nghi Xuân', 'Huyện Thạch Hà', 'Huyện Vũ Quang'],
  },
  {
    id: 'haiduong',
    name: 'Tỉnh Hải Dương',
    districts: ['Thành phố Hải Dương', 'Thành phố Chí Linh', 'Thị xã Kinh Môn', 'Huyện Bình Giang', 'Huyện Cẩm Giàng', 'Huyện Gia Lộc', 'Huyện Kim Thành', 'Huyện Nam Sách', 'Huyện Ninh Giang', 'Huyện Thanh Hà', 'Huyện Thanh Miện', 'Huyện Tứ Kỳ'],
  },
  {
    id: 'haugiang',
    name: 'Tỉnh Hậu Giang',
    districts: ['Thành phố Vị Thanh', 'Thành phố Ngã Bảy', 'Thị xã Long Mỹ', 'Huyện Phụng Hiệp', 'Huyện Vị Thủy', 'Huyện Châu Thành', 'Huyện Châu Thành A', 'Huyện Long Mỹ'],
  },
  {
    id: 'hoabinh',
    name: 'Tỉnh Hòa Bình',
    districts: ['Thành phố Hòa Bình', 'Huyện Cao Phong', 'Huyện Đà Bắc', 'Huyện Kim Bôi', 'Huyện Lạc Sơn', 'Huyện Lạc Thủy', 'Huyện Lương Sơn', 'Huyện Mai Châu', 'Huyện Tân Lạc', 'Huyện Yên Thủy'],
  },
  {
    id: 'hungyen',
    name: 'Tỉnh Hưng Yên',
    districts: ['Thành phố Hưng Yên', 'Thị xã Mỹ Hào', 'Huyện Ân Thi', 'Huyện Khoái Châu', 'Huyện Kim Động', 'Huyện Phù Cừ', 'Huyện Tiên Lữ', 'Huyện Văn Giang', 'Huyện Văn Lâm', 'Huyện Yên Mỹ'],
  },
  {
    id: 'khanhhoa',
    name: 'Tỉnh Khánh Hòa',
    districts: ['Thành phố Nha Trang', 'Thành phố Cam Ranh', 'Thị xã Ninh Hòa', 'Huyện Vạn Ninh', 'Huyện Diên Khánh', 'Huyện Khánh Vĩnh', 'Huyện Khánh Sơn', 'Huyện Cam Lâm', 'Huyện Trường Sa'],
  },
  {
    id: 'kiengiang',
    name: 'Tỉnh Kiên Giang',
    districts: ['Thành phố Rạch Giá', 'Thành phố Hà Tiên', 'Thành phố Phú Quốc', 'Huyện An Biên', 'Huyện An Minh', 'Huyện Châu Thành', 'Huyện Giang Thành', 'Huyện Giồng Riềng', 'Huyện Gò Quao', 'Huyện Hòn Đất', 'Huyện Kiên Lương', 'Huyện Tân Hiệp', 'Huyện Vĩnh Thuận', 'Huyện U Minh Thượng', 'Huyện Kiên Hải'],
  },
  {
    id: 'kontum',
    name: 'Tỉnh Kon Tum',
    districts: ['Thành phố Kon Tum', 'Huyện Đắk Glei', 'Huyện Đắk Hà', 'Huyện Đắk Tô', 'Huyện Ia H\'Drai', 'Huyện Kon Plông', 'Huyện Kon Rông', 'Huyện Ngọc Hồi', 'Huyện Sa Thầy', 'Huyện Tu Mơ Rông'],
  },
  {
    id: 'laichau',
    name: 'Tỉnh Lai Châu',
    districts: ['Thành phố Lai Châu', 'Huyện Mường Tè', 'Huyện Nậm Nhùn', 'Huyện Phong Thổ', 'Huyện Sìn Hồ', 'Huyện Tam Đường', 'Huyện Tân Uyên', 'Huyện Than Uyên'],
  },
  {
    id: 'lamdong',
    name: 'Tỉnh Lâm Đồng',
    districts: ['Thành phố Đà Lạt', 'Thành phố Bảo Lộc', 'Huyện Bảo Lâm', 'Huyện Cát Tiên', 'Huyện Di Linh', 'Huyện Đạ Huoai', 'Huyện Đạ Tẻh', 'Huyện Đam Rông', 'Huyện Đơn Dương', 'Huyện Đức Trọng', 'Huyện Lạc Dương', 'Huyện Lâm Hà'],
  },
  {
    id: 'langson',
    name: 'Tỉnh Lạng Sơn',
    districts: ['Thành phố Lạng Sơn', 'Huyện Bắc Sơn', 'Huyện Bình Gia', 'Huyện Cao Lộc', 'Huyện Chi Lăng', 'Huyện Đình Lập', 'Huyện Hữu Lũng', 'Huyện Lộc Bình', 'Huyện Tràng Định', 'Huyện Văn Lãng', 'Huyện Văn Quan'],
  },
  {
    id: 'laocai',
    name: 'Tỉnh Lào Cai',
    districts: ['Thành phố Lào Cai', 'Thị xã Sa Pa', 'Huyện Bắc Hà', 'Huyện Bảo Thắng', 'Huyện Bảo Yên', 'Huyện Bát Xát', 'Huyện Mường Khương', 'Huyện Si Ma Cai', 'Huyện Văn Bàn'],
  },
  {
    id: 'longan',
    name: 'Tỉnh Long An',
    districts: ['Thành phố Tân An', 'Thị xã Kiến Tường', 'Huyện Bến Lức', 'Huyện Cần Đước', 'Huyện Cần Giuộc', 'Huyện Châu Thành', 'Huyện Đức Hòa', 'Huyện Đức Huệ', 'Huyện Mộc Hóa', 'Huyện Tân Hưng', 'Huyện Tân Thạnh', 'Huyện Tân Trụ', 'Huyện Thạnh Hóa', 'Huyện Thủ Thừa', 'Huyện Vĩnh Hưng'],
  },
  {
    id: 'namdinh',
    name: 'Tỉnh Nam Định',
    districts: ['Thành phố Nam Định', 'Huyện Giao Thủy', 'Huyện Hải Hậu', 'Huyện Mỹ Lộc', 'Huyện Nam Trực', 'Huyện Nghĩa Hưng', 'Huyện Trực Ninh', 'Huyện Vụ Bản', 'Huyện Xuân Trường', 'Huyện Ý Yên'],
  },
  {
    id: 'nghean',
    name: 'Tỉnh Nghệ An',
    districts: ['Thành phố Vinh', 'Thị xã Cửa Lò', 'Thị xã Thái Hòa', 'Thị xã Hoàng Mai', 'Huyện Anh Sơn', 'Huyện Con Cuông', 'Huyện Diễn Châu', 'Huyện Đô Lương', 'Huyện Hưng Nguyên', 'Huyện Kỳ Sơn', 'Huyện Nam Đàn', 'Huyện Nghi Lộc', 'Huyện Nghĩa Đàn', 'Huyện Phong Điền', 'Huyện Quỳ Châu', 'Huyện Quỳ Hợp', 'Huyện Quỳnh Lưu', 'Huyện Tân Kỳ', 'Huyện Thanh Chương', 'Huyện Tương Dương', 'Huyện Yên Thành'],
  },
  {
    id: 'ninhbinh',
    name: 'Tỉnh Ninh Bình',
    districts: ['Thành phố Ninh Bình', 'Thành phố Tam Điệp', 'Huyện Gia Viễn', 'Huyện Hoa Lư', 'Huyện Kim Sơn', 'Huyện Nho Quan', 'Huyện Yên Khánh', 'Huyện Yên Mô'],
  },
  {
    id: 'ninhthuan',
    name: 'Tỉnh Ninh Thuận',
    districts: ['Thành phố Phan Rang - Tháp Chàm', 'Huyện Bác Ái', 'Huyện Ninh Sơn', 'Huyện Ninh Phước', 'Huyện Ninh Hải', 'Huyện Thuận Bắc', 'Huyện Thuận Nam'],
  },
  {
    id: 'phutho',
    name: 'Tỉnh Phú Thọ',
    districts: ['Thành phố Việt Trì', 'Thị xã Phú Thọ', 'Huyện Cẩm Khê', 'Huyện Đoan Hùng', 'Huyện Hạ Hòa', 'Huyện Lâm Thao', 'Huyện Phù Ninh', 'Huyện Tam Nông', 'Huyện Tân Sơn', 'Huyện Thanh Ba', 'Huyện Thanh Sơn', 'Huyện Thanh Thủy', 'Huyện Yên Lập'],
  },
  {
    id: 'phuyen',
    name: 'Tỉnh Phú Yên',
    districts: ['Thành phố Tuy Hòa', 'Thị xã Sông Cầu', 'Thị xã Đông Hòa', 'Huyện Đồng Xuân', 'Huyện Phú Hòa', 'Huyện Sơn Hòa', 'Huyện Tây Hòa', 'Huyện Tuy An', 'Huyện Sông Hinh'],
  },
  {
    id: 'quangbinh',
    name: 'Tỉnh Quảng Bình',
    districts: ['Thành phố Đồng Hới', 'Thị xã Ba Đồn', 'Huyện Bố Trạch', 'Huyện Lệ Thủy', 'Huyện Minh Hóa', 'Huyện Quảng Ninh', 'Huyện Quảng Trạch', 'Huyện Tuyên Hóa'],
  },
  {
    id: 'quangnam',
    name: 'Tỉnh Quảng Nam',
    districts: ['Thành phố Tam Kỳ', 'Thành phố Hội An', 'Thị xã Điện Bàn', 'Huyện Bắc Trà My', 'Huyện Đại Lộc', 'Huyện Đông Giang', 'Huyện Duy Xuyên', 'Huyện Hiệp Đức', 'Huyện Nam Giang', 'Huyện Nam Trà My', 'Huyện Nông Sơn', 'Huyện Núi Thành', 'Huyện Phú Ninh', 'Huyện Phước Sơn', 'Huyện Quế Sơn', 'Huyện Tây Giang', 'Huyện Thăng Bình', 'Huyện Tiên Phước'],
  },
  {
    id: 'quangngai',
    name: 'Tỉnh Quảng Ngãi',
    districts: ['Thành phố Quảng Ngãi', 'Thị xã Đức Phổ', 'Huyện Ba Tơ', 'Huyện Bình Sơn', 'Huyện Đức Phổ', 'Huyện Minh Long', 'Huyện Mộ Đức', 'Huyện Nghĩa Hành', 'Huyện Sơn Hà', 'Huyện Sơn Tây', 'Huyện Sơn Tịnh', 'Huyện Trà Bồng', 'Huyện Tư Nghĩa', 'Huyện Lý Sơn'],
  },
  {
    id: 'quangninh',
    name: 'Tỉnh Quảng Ninh',
    districts: ['Thành phố Hạ Long', 'Thành phố Móng Cái', 'Thành phố Cẩm Phả', 'Thành phố Uông Bí', 'Thành phố Đông Triều', 'Thị xã Quảng Yên', 'Huyện Ba Chẽ', 'Huyện Bình Liêu', 'Huyện Đầm Hà', 'Huyện Hải Hà', 'Huyện Tiên Yên', 'Huyện Vân Đồn', 'Huyện Cô Tô'],
  },
  {
    id: 'quangtri',
    name: 'Tỉnh Quảng Trị',
    districts: ['Thành phố Đông Hà', 'Thị xã Quảng Trị', 'Huyện Cam Lộ', 'Huyện Cồn Cỏ', 'Huyện Đakrông', 'Huyện Gio Linh', 'Huyện Hải Lăng', 'Huyện Hướng Hóa', 'Huyện Triệu Phong', 'Huyện Vĩnh Linh'],
  },
  {
    id: 'soctrang',
    name: 'Tỉnh Sóc Trăng',
    districts: ['Thành phố Sóc Trăng', 'Thị xã Ngã Năm', 'Thị xã Vĩnh Châu', 'Huyện Châu Thành', 'Huyện Cù Lao Dung', 'Huyện Long Phú', 'Huyện Mỹ Tú', 'Huyện Mỹ Xuyên', 'Huyện Thạnh Trị', 'Huyện Trần Đề', 'Huyện Kế Sách'],
  },
  {
    id: 'sonla',
    name: 'Tỉnh Sơn La',
    districts: ['Thành phố Sơn La', 'Huyện Quỳnh Nhai', 'Huyện Thuận Châu', 'Huyện Mường La', 'Huyện Bắc Yên', 'Huyện Phù Yên', 'Huyện Mộc Châu', 'Huyện Yên Châu', 'Huyện Mai Sơn', 'Huyện Sông Mã', 'Huyện Sốp Cộp', 'Huyện Vân Hồ'],
  },
  {
    id: 'tayninh',
    name: 'Tỉnh Tây Ninh',
    districts: ['Thành phố Tây Ninh', 'Thị xã Trảng Bàng', 'Thị xã Hòa Thành', 'Huyện Bến Cầu', 'Huyện Châu Thành', 'Huyện Dương Minh Châu', 'Huyện Gò Dầu', 'Huyện Tân Biên', 'Huyện Tân Châu'],
  },
  {
    id: 'thaibinh',
    name: 'Tỉnh Thái Bình',
    districts: ['Thành phố Thái Bình', 'Huyện Đông Hưng', 'Huyện Hưng Hà', 'Huyện Kiến Xương', 'Huyện Quỳnh Phụ', 'Huyện Thái Thụy', 'Huyện Tiền Hải', 'Huyện Vũ Thư'],
  },
  {
    id: 'thainguyen',
    name: 'Tỉnh Thái Nguyên',
    districts: ['Thành phố Thái Nguyên', 'Thành phố Sông Công', 'Thành phố Phổ Yên', 'Huyện Đại Từ', 'Huyện Định Hóa', 'Huyện Đồng Hỷ', 'Huyện Phú Bình', 'Huyện Phú Lương', 'Huyện Võ Nhai'],
  },
  {
    id: 'thanhhoa',
    name: 'Tỉnh Thanh Hóa',
    districts: ['Thành phố Thanh Hóa', 'Thành phố Sầm Sơn', 'Thị xã Bỉm Sơn', 'Thị xã Nghi Sơn', 'Huyện Bá Thước', 'Huyện Cẩm Thủy', 'Huyện Đông Sơn', 'Huyện Hà Trung', 'Huyện Hậu Lộc', 'Huyện Hoằng Hóa', 'Huyện Lang Chánh', 'Huyện Mường Lát', 'Huyện Nga Sơn', 'Huyện Ngọc Lặc', 'Huyện Như Thanh', 'Huyện Như Xuân', 'Huyện Nông Cống', 'Huyện Quan Hóa', 'Huyện Quan Sơn', 'Huyện Quảng Xương', 'Huyện Thạch Thành', 'Huyện Thiệu Hóa', 'Huyện Thọ Xuân', 'Huyện Thường Xuân', 'Huyện Triệu Sơn', 'Huyện Vĩnh Lộc', 'Huyện Yên Định'],
  },
  {
    id: 'thuathienhue',
    name: 'Thành phố Thừa Thiên Huế',
    districts: ['Thành phố Huế', 'Thị xã Hương Thủy', 'Thị xã Hương Trà', 'Huyện A Lưới', 'Huyện Nam Đông', 'Huyện Phong Điền', 'Huyện Phú Lộc', 'Huyện Phú Vang', 'Huyện Quảng Điền'],
  },
  {
    id: 'tiengiang',
    name: 'Tỉnh Tiền Giang',
    districts: ['Thành phố Mỹ Tho', 'Thành phố Gò Công', 'Thị xã Cai Lậy', 'Huyện Cai Lậy', 'Huyện Châu Thành', 'Huyện Chợ Gạo', 'Huyện Gò Công Đông', 'Huyện Gò Công Tây', 'Huyện Tân Phước', 'Huyện Tân Phú Đông', 'Huyện Cái Bè'],
  },
  {
    id: 'travinh',
    name: 'Tỉnh Trà Vinh',
    districts: ['Thành phố Trà Vinh', 'Thị xã Duyên Hải', 'Huyện Càng Long', 'Huyện Cầu Kè', 'Huyện Cầu Ngang', 'Huyện Châu Thành', 'Huyện Duyên Hải', 'Huyện Tiểu Cần', 'Huyện Trà Cú'],
  },
  {
    id: 'tuyenquang',
    name: 'Tỉnh Tuyên Quang',
    districts: ['Thành phố Tuyên Quang', 'Huyện Chiêm Hóa', 'Huyện Hàm Yên', 'Huyện Lâm Bình', 'Huyện Na Hang', 'Huyện Sơn Dương', 'Huyện Yên Sơn'],
  },
  {
    id: 'vinhlong',
    name: 'Tỉnh Vĩnh Long',
    districts: ['Thành phố Vĩnh Long', 'Thị xã Bình Minh', 'Huyện Bình Tân', 'Huyện Long Hồ', 'Huyện Mang Thít', 'Huyện Tam Bình', 'Huyện Trà Ôn', 'Huyện Vũng Liêm'],
  },
  {
    id: 'vinhphuc',
    name: 'Tỉnh Vĩnh Phúc',
    districts: ['Thành phố Vĩnh Yên', 'Thành phố Phúc Yên', 'Huyện Bình Xuyên', 'Huyện Lập Thạch', 'Huyện Sông Lô', 'Huyện Tam Dương', 'Huyện Tam Đảo', 'Huyện Vĩnh Tường', 'Huyện Yên Lạc'],
  },
  {
    id: 'yenbai',
    name: 'Tỉnh Yên Bái',
    districts: ['Thành phố Yên Bái', 'Thị xã Nghĩa Lộ', 'Huyện Lục Yên', 'Huyện Mù Cang Chải', 'Huyện Trạm Tấu', 'Huyện Trấn Yên', 'Huyện Văn Chấn', 'Huyện Văn Yên', 'Huyện Yên Bình'],
  },
];
