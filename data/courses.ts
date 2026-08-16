export interface Lesson {
  id: string;
  title: string;
  duration: string;
  isPreview?: boolean;
  fileUrl?: string;
  fileName?: string;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  category: 'word' | 'excel' | 'powerpoint' | 'mos365' | 'mos2019';
  categoryLabel: string;
  price: number;
  originalPrice: number;
  badge?: string;
  badgeType?: 'hot' | 'sale' | 'new';
  level: 'Cơ bản' | 'Nâng cao' | 'Mở rộng' | 'Mọi cấp độ';
  duration: string;
  lessonsCount: number;
  rating: number;
  reviewsCount: number;
  studentsCount: number;
  image: string;
  desc: string;
  description?: string;
  fullDescription: string;
  instructor: {
    name: string;
    title: string;
    avatar: string;
  };
  modules: Module[];
}

export const COURSES_DATA: Course[] = [
  // ===================== KHÓA HỌC WORD (khoa-hoc-word) =====================
  {
    id: 'word-co-ban',
    title: 'Khóa học Word Cơ Bản',
    slug: 'word-co-ban',
    category: 'word',
    categoryLabel: 'Khóa học Word',
    price: 490000,
    originalPrice: 850000,
    badge: 'Bán chạy',
    badgeType: 'hot',
    level: 'Cơ bản',
    duration: '15 Giờ học',
    lessonsCount: 32,
    rating: 4.9,
    reviewsCount: 342,
    studentsCount: 1250,
    image: '/MOS1000_Assets/assets/images/products/khoa-hoc-word/word-co-ban.jpg',
    desc: 'Khóa học Word Cơ Bản giúp bạn làm chủ toàn bộ kỹ năng soạn thảo văn bản từ con số 0.',
    fullDescription: 'Khóa học Word Cơ Bản giúp học viên làm chủ toàn bộ kỹ năng soạn thảo văn bản chuyên nghiệp theo chuẩn quốc tế Microsoft. Bạn sẽ nắm vững định dạng trang, kiểu chữ, canh lề, làm việc với bảng biểu và thao tác nâng cao hiệu suất làm việc.',
    instructor: {
      name: 'ThS. Nguyễn Văn Minh',
      title: 'Chuyên gia Giảng dạy Tin học Văn phòng',
      avatar: '/MOS1000_Assets/assets/images/logo/logo-MOS1000.png',
    },
    modules: [
      {
        id: 'mod-w1',
        title: 'Chương 1: Tổng quan giao diện & Quản lý Tài liệu',
        lessons: [
          { id: 'lw-1', title: '1.1 Tổng quan giao diện Word và thanh công cụ Ribbon', duration: '12:45', isPreview: true },
          { id: 'lw-2', title: '1.2 Tạo, lưu và thiết lập tùy chọn bảo mật văn bản', duration: '18:20', isPreview: true },
          { id: 'lw-3', title: '1.3 Định dạng trang, lề và Watermark', duration: '15:10' },
        ],
      },
      {
        id: 'mod-w2',
        title: 'Chương 2: Định dạng Văn bản & Đoạn văn chuyên nghiệp',
        lessons: [
          { id: 'lw-4', title: '2.1 Sử dụng Styles, Indents và Line Spacing', duration: '22:15', fileUrl: '#', fileName: 'BaiTap_Module2_Word.docx' },
          { id: 'lw-5', title: '2.2 Tìm kiếm & Thay thế nâng cao (Find & Replace)', duration: '16:40' },
          { id: 'lw-6', title: '2.3 Định dạng danh sách Bullets & Numbering tự động', duration: '14:30' },
        ],
      },
    ],
  },
  {
    id: 'word-nang-cao',
    title: 'Khóa học Word Nâng Cao',
    slug: 'word-nang-cao',
    category: 'word',
    categoryLabel: 'Khóa học Word',
    price: 550000,
    originalPrice: 890000,
    badge: 'Nâng cao',
    badgeType: 'hot',
    level: 'Nâng cao',
    duration: '18 Giờ học',
    lessonsCount: 35,
    rating: 4.9,
    reviewsCount: 280,
    studentsCount: 980,
    image: '/MOS1000_Assets/assets/images/products/khoa-hoc-word/word-nang-cao.jpg',
    desc: 'Khóa học Word Nâng Cao với kỹ năng quản lý mẫu template, trộn thư Mail Merge và bảo mật văn bản.',
    fullDescription: 'Khóa học thiết kế riêng cho người đi làm và sinh viên năm cuối cần soạn thảo các báo cáo tài chính, luận văn, hợp đồng lớn với định dạng tự động hóa 100%.',
    instructor: {
      name: 'ThS. Nguyễn Văn Minh',
      title: 'Chuyên gia Giảng dạy Tin học Văn phòng',
      avatar: '/MOS1000_Assets/assets/images/logo/logo-MOS1000.png',
    },
    modules: [],
  },
  {
    id: 'word-nang-cao-2',
    title: 'Khóa học Word Nâng Cao 2',
    slug: 'word-nang-cao-2',
    category: 'word',
    categoryLabel: 'Khóa học Word',
    price: 580000,
    originalPrice: 920000,
    badge: 'Nâng cao',
    badgeType: 'new',
    level: 'Nâng cao',
    duration: '20 Giờ học',
    lessonsCount: 38,
    rating: 5.0,
    reviewsCount: 215,
    studentsCount: 860,
    image: '/MOS1000_Assets/assets/images/products/khoa-hoc-word/word-nang-cao-2.jpg',
    desc: 'Khóa học Word Nâng Cao 2 bứt phá kỹ năng xử lý mục lục tự động, chỉ mục Index và trích dẫn báo cáo khoa học.',
    fullDescription: 'Khóa học chuyên sâu giúp học viên hoàn thiện bộ kỹ năng xử lý văn bản quy mô lớn phức tạp.',
    instructor: {
      name: 'ThS. Nguyễn Văn Minh',
      title: 'Chuyên gia Giảng dạy Tin học Văn phòng',
      avatar: '/MOS1000_Assets/assets/images/logo/logo-MOS1000.png',
    },
    modules: [],
  },
  {
    id: 'word-mo-rong',
    title: 'Khóa học Word Mở Rộng',
    slug: 'word-mo-rong',
    category: 'word',
    categoryLabel: 'Khóa học Word',
    price: 480000,
    originalPrice: 750000,
    badge: 'Mở rộng',
    badgeType: 'sale',
    level: 'Mở rộng',
    duration: '14 Giờ học',
    lessonsCount: 28,
    rating: 4.8,
    reviewsCount: 160,
    studentsCount: 720,
    image: '/MOS1000_Assets/assets/images/products/khoa-hoc-word/word-mo-rong.jpg',
    desc: 'Khóa học Word Mở Rộng tổng hợp 50+ bộ tài liệu mẫu và dự án soạn thảo thực tế của doanh nghiệp.',
    fullDescription: 'Rèn luyện kỹ năng giải quyết công việc thực tế mở rộng song song với bài thi chứng chỉ tin học.',
    instructor: {
      name: 'ThS. Nguyễn Văn Minh',
      title: 'Chuyên gia Giảng dạy Tin học Văn phòng',
      avatar: '/MOS1000_Assets/assets/images/logo/logo-MOS1000.png',
    },
    modules: [],
  },

  // ===================== KHÓA HỌC EXCEL (khoa-hoc-excel) =====================
  {
    id: 'excel-co-ban',
    title: 'Khóa học Excel Cơ Bản',
    slug: 'excel-co-ban',
    category: 'excel',
    categoryLabel: 'Khóa học Excel',
    price: 490000,
    originalPrice: 790000,
    badge: 'Nền tảng',
    badgeType: 'sale',
    level: 'Cơ bản',
    duration: '14 Giờ học',
    lessonsCount: 28,
    rating: 4.9,
    reviewsCount: 310,
    studentsCount: 1420,
    image: '/MOS1000_Assets/assets/images/products/khoa-hoc-excel/excel-co-ban.jpg',
    desc: 'Khóa học Excel Cơ Bản lấy lại căn bản từ con số 0. Thành thạo phím tắt, nhập liệu và xử lý bảng tính.',
    fullDescription: 'Dành riêng cho những ai sợ Excel hoặc chưa từng tiếp xúc với máy tính. Giáo trình vô cùng trực quan dễ hiểu.',
    instructor: {
      name: 'TS. Trần Hoàng Nam',
      title: 'Chuyên gia Phân tích Dữ liệu',
      avatar: '/MOS1000_Assets/assets/images/logo/logo-MOS1000.png',
    },
    modules: [],
  },
  {
    id: 'excel-nang-cao',
    title: 'Khóa học Excel Nâng Cao',
    slug: 'excel-nang-cao',
    category: 'excel',
    categoryLabel: 'Khóa học Excel',
    price: 520000,
    originalPrice: 890000,
    badge: 'Khuyên dùng',
    badgeType: 'hot',
    level: 'Nâng cao',
    duration: '18 Giờ học',
    lessonsCount: 38,
    rating: 5.0,
    reviewsCount: 418,
    studentsCount: 1680,
    image: '/MOS1000_Assets/assets/images/products/khoa-hoc-excel/excel-nang-cao.jpg',
    desc: 'Khóa học Excel Nâng Cao nắm chắc hàm, công thức, biểu đồ và kỹ năng quản lý bảng tính quy mô lớn.',
    fullDescription: 'Khóa học giúp bạn nắm vững toàn bộ các kỹ năng Excel từ quản lý ô bảng tính, định dạng điều kiện, các hàm xử lý chuỗi - logic - dò tìm đến vẽ biểu đồ chuẩn chỉnh.',
    instructor: {
      name: 'TS. Trần Hoàng Nam',
      title: 'Chuyên gia Phân tích Dữ liệu',
      avatar: '/MOS1000_Assets/assets/images/logo/logo-MOS1000.png',
    },
    modules: [
      {
        id: 'mod-e1',
        title: 'Chương 1: Quản lý Trang tính (Worksheet) & Vùng Dữ liệu',
        lessons: [
          { id: 'le-1', title: '1.1 Tổng quan giao diện Excel & Thao tác vùng dữ liệu', duration: '14:10', isPreview: true },
          { id: 'le-2', title: '1.2 Nhập dữ liệu, di chuyển, định dạng Cell Format & Number Format', duration: '20:30' },
        ],
      },
      {
        id: 'mod-e2',
        title: 'Chương 2: Làm chủ Công thức & Hàm (Formulas & Functions)',
        lessons: [
          { id: 'le-3', title: '2.1 Nhóm hàm tính toán: SUM, AVERAGE, COUNT, MAX, MIN', duration: '24:00', fileUrl: '#', fileName: 'Ham_Excel_CoBan.xlsx' },
          { id: 'le-4', title: '2.2 Nhóm hàm Logic & Chuỗi: IF, AND, OR, CONCAT, LEFT, RIGHT', duration: '28:15' },
          { id: 'le-5', title: '2.3 Nhóm hàm dò tìm: VLOOKUP, HLOOKUP và XLOOKUP', duration: '32:00', fileUrl: '#', fileName: 'Ham_DoTim_Advanced.xlsx' },
        ],
      },
    ],
  },
  {
    id: 'excel-nang-cao-2',
    title: 'Khóa học Excel Nâng Cao 2',
    slug: 'excel-nang-cao-2',
    category: 'excel',
    categoryLabel: 'Khóa học Excel',
    price: 580000,
    originalPrice: 950000,
    badge: 'Chuyên sâu',
    badgeType: 'hot',
    level: 'Nâng cao',
    duration: '20 Giờ học',
    lessonsCount: 36,
    rating: 5.0,
    reviewsCount: 340,
    studentsCount: 1250,
    image: '/MOS1000_Assets/assets/images/products/khoa-hoc-excel/excel-nang-cao-2.jpg',
    desc: 'Khóa học Excel Nâng Cao 2 làm chủ PivotTable, Slicer, Dashboard phân tích doanh thu và tự động hóa Macro.',
    fullDescription: 'Làm chủ các công cụ nâng cao của Microsoft Excel để tự tay thiết kế báo cáo tài chính kinh doanh tự động.',
    instructor: {
      name: 'TS. Trần Hoàng Nam',
      title: 'Chuyên gia Phân tích Dữ liệu',
      avatar: '/MOS1000_Assets/assets/images/logo/logo-MOS1000.png',
    },
    modules: [],
  },
  {
    id: 'excel-mo-rong',
    title: 'Khóa học Excel Mở Rộng',
    slug: 'excel-mo-rong',
    category: 'excel',
    categoryLabel: 'Khóa học Excel',
    price: 620000,
    originalPrice: 990000,
    badge: 'Mở rộng',
    badgeType: 'new',
    level: 'Mở rộng',
    duration: '22 Giờ học',
    lessonsCount: 40,
    rating: 5.0,
    reviewsCount: 290,
    studentsCount: 1120,
    image: '/MOS1000_Assets/assets/images/products/khoa-hoc-excel/excel-mo-rong.jpg',
    desc: 'Khóa học Excel Mở Rộng làm chủ Power Query, Power Pivot, xử lý dữ liệu Big Data và trực quan báo cáo.',
    fullDescription: 'Kỹ năng mở rộng phân tích dữ liệu đa chiều quy mô doanh nghiệp.',
    instructor: {
      name: 'TS. Trần Hoàng Nam',
      title: 'Chuyên gia Phân tích Dữ liệu',
      avatar: '/MOS1000_Assets/assets/images/logo/logo-MOS1000.png',
    },
    modules: [],
  },

  // ===================== KHÓA HỌC POWERPOINT (khoa-hoc-powerpoint) =====================
  {
    id: 'powerpoint-co-ban',
    title: 'Khóa học PowerPoint Cơ Bản',
    slug: 'powerpoint-co-ban',
    category: 'powerpoint',
    categoryLabel: 'Khóa học PowerPoint',
    price: 390000,
    originalPrice: 650000,
    badge: 'Nền tảng',
    badgeType: 'sale',
    level: 'Cơ bản',
    duration: '10 Giờ học',
    lessonsCount: 20,
    rating: 4.8,
    reviewsCount: 150,
    studentsCount: 710,
    image: '/MOS1000_Assets/assets/images/products/khoa-hoc-powerpoint/powerpoint-co-ban.jpg',
    desc: 'Khóa học PowerPoint Cơ Bản học thiết kế slide đẹp mắt, bố cục cân đối và làm chủ công cụ trình chiếu.',
    fullDescription: 'Cung cấp nền tảng vững chắc cho sinh viên báo cáo môn học và nhân viên văn phòng thiết kế bài thuyết trình.',
    instructor: {
      name: 'ThS. Lê Thùy Trang',
      title: 'Chuyên gia Thiết kế Slide',
      avatar: '/MOS1000_Assets/assets/images/logo/logo-MOS1000.png',
    },
    modules: [],
  },
  {
    id: 'powerpoint-nang-cao',
    title: 'Khóa học PowerPoint Nâng Cao',
    slug: 'powerpoint-nang-cao',
    category: 'powerpoint',
    categoryLabel: 'Khóa học PowerPoint',
    price: 450000,
    originalPrice: 790000,
    badge: 'Nâng cao',
    badgeType: 'new',
    level: 'Nâng cao',
    duration: '12 Giờ học',
    lessonsCount: 26,
    rating: 4.8,
    reviewsCount: 198,
    studentsCount: 890,
    image: '/MOS1000_Assets/assets/images/products/khoa-hoc-powerpoint/powerpoint-nang-cao.jpg',
    desc: 'Khóa học PowerPoint Nâng Cao hướng dẫn tạo bài thuyết trình chuyên nghiệp, hiệu ứng chuyển slide & animation.',
    fullDescription: 'Khóa học PowerPoint nâng cao giúp bạn thiết kế những slide thuyết trình hiện đại, ấn tượng. Học cách làm việc với Slide Master, nhúng video, audio, bảng biểu, sơ đồ SmartArt và hiệu ứng Morph.',
    instructor: {
      name: 'ThS. Lê Thùy Trang',
      title: 'Chuyên gia Thiết kế Slide',
      avatar: '/MOS1000_Assets/assets/images/logo/logo-MOS1000.png',
    },
    modules: [],
  },
  {
    id: 'powerpoint-mo-rong',
    title: 'Khóa học PowerPoint Mở Rộng',
    slug: 'powerpoint-mo-rong',
    category: 'powerpoint',
    categoryLabel: 'Khóa học PowerPoint',
    price: 490000,
    originalPrice: 820000,
    badge: 'Mở rộng',
    badgeType: 'hot',
    level: 'Mở rộng',
    duration: '14 Giờ học',
    lessonsCount: 28,
    rating: 4.9,
    reviewsCount: 175,
    studentsCount: 830,
    image: '/MOS1000_Assets/assets/images/products/khoa-hoc-powerpoint/powerpoint-mo-rong.jpg',
    desc: 'Khóa học PowerPoint Mở Rộng bí kíp biến slide phẳng thành video chuyển động 3D nghệ thuật đỉnh cao.',
    fullDescription: 'Tận dụng toàn bộ sức mạnh của Morph Transition, Trigger Animation và nhúng video tương tác.',
    instructor: {
      name: 'ThS. Lê Thùy Trang',
      title: 'Chuyên gia Thiết kế Slide',
      avatar: '/MOS1000_Assets/assets/images/logo/logo-MOS1000.png',
    },
    modules: [],
  },

  // ===================== KHÓA HỌC MOS 2019 (khoa-hoc-mos-2019) =====================
  {
    id: 'mos-2019',
    title: 'Khóa học MOS 2019',
    slug: 'mos-2019',
    category: 'mos2019',
    categoryLabel: 'Khóa MOS 2019',
    price: 990000,
    originalPrice: 2530000,
    badge: 'MOS 2019',
    badgeType: 'sale',
    level: 'Mọi cấp độ',
    duration: '45 Giờ học',
    lessonsCount: 96,
    rating: 5.0,
    reviewsCount: 610,
    studentsCount: 3100,
    image: '/MOS1000_Assets/assets/images/products/khoa-hoc-mos-2019/MOS-2019.jpg',
    desc: 'Khóa học MOS 2019 trọn bộ 3 chứng chỉ Word, Excel và PowerPoint 2019 chuẩn quốc tế.',
    fullDescription: 'Gói Luyện thi chứng chỉ MOS 2019 giúp bạn tiết kiệm chi phí tối đa và sở hữu ngay cả 3 chứng chỉ tin học văn phòng quốc tế có giá trị trọn đời.',
    instructor: {
      name: 'Đội ngũ Giảng viên MOS Master',
      title: 'Certiport Master Instructors Team',
      avatar: '/MOS1000_Assets/assets/images/logo/logo-MOS1000.png',
    },
    modules: [],
  },

  // ===================== KHÓA HỌC MOS 365 (khoa-hoc-mos-365) =====================
  {
    id: 'mos-365',
    title: 'Khóa học MOS 365',
    slug: 'mos-365',
    category: 'mos365',
    categoryLabel: 'Khóa MOS 365',
    price: 1090000,
    originalPrice: 2800000,
    badge: 'MOS 365',
    badgeType: 'new',
    level: 'Mọi cấp độ',
    duration: '48 Giờ học',
    lessonsCount: 102,
    rating: 5.0,
    reviewsCount: 420,
    studentsCount: 2150,
    image: '/MOS1000_Assets/assets/images/products/khoa-hoc-mos-365/MOS-365.jpg',
    desc: 'Khóa học MOS 365 trọn bộ Microsoft 365 Apps for Enterprise mới nhất bám sát xu hướng công nghệ.',
    fullDescription: 'Cập nhật những tính năng mới nhất của Microsoft 365 Apps for Enterprise và quy trình thi trực tuyến.',
    instructor: {
      name: 'Đội ngũ Giảng viên MOS Master',
      title: 'Certiport Master Instructors Team',
      avatar: '/MOS1000_Assets/assets/images/logo/logo-MOS1000.png',
    },
    modules: [],
  },
];

export function formatVND(amount: number): string {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}
