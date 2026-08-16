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
  category: 'word' | 'excel' | 'powerpoint' | 'combo';
  categoryLabel: string;
  price: number;
  originalPrice: number;
  badge?: string;
  badgeType?: 'hot' | 'sale' | 'new';
  level: 'Cơ bản' | 'Nâng cao' | 'Mọi cấp độ' | 'Cấp tốc';
  duration: string;
  lessonsCount: number;
  rating: number;
  reviewsCount: number;
  studentsCount: number;
  image: string;
  desc: string;
  fullDescription: string;
  instructor: {
    name: string;
    title: string;
    avatar: string;
  };
  modules: Module[];
}

export const COURSES_DATA: Course[] = [
  {
    id: 'mos-word-2019',
    title: 'Khóa Học MOS Word 2019/365 Specialist - Đạt 1000 Điểm',
    slug: 'mos-word-2019',
    category: 'word',
    categoryLabel: 'MOS Word',
    price: 490000,
    originalPrice: 850000,
    badge: 'Bán chạy',
    badgeType: 'hot',
    level: 'Mọi cấp độ',
    duration: '15 Giờ học',
    lessonsCount: 32,
    rating: 4.9,
    reviewsCount: 342,
    studentsCount: 1250,
    image: '/MOS1000_Assets/assets/images/products/khoa-hoc-word/word-co-ban.jpg',
    desc: 'Luyện thi chứng chỉ MOS Word từ A-Z. Cung cấp bộ 300+ bài tập thao tác thực tế và đề thi mô phỏng Certiport.',
    fullDescription: 'Khóa học MOS Word 2019/365 giúp học viên làm chủ toàn bộ kỹ năng soạn thảo văn bản chuyên nghiệp theo chuẩn quốc tế Microsoft. Bạn sẽ nắm vững cấu trúc đề thi Certiport, mẹo làm bài tính thời gian và tuyệt chiêu đạt điểm tối đa 1000 điểm.',
    instructor: {
      name: 'ThS. Nguyễn Văn Minh',
      title: 'Chuyên gia Giảng dạy MOS Certiport Certified',
      avatar: '/MOS1000_Assets/assets/images/logo/logo-MOS1000.png',
    },
    modules: [
      {
        id: 'mod-w1',
        title: 'Chương 1: Tổng quan giao diện & Quản lý Tài liệu (Document Management)',
        lessons: [
          { id: 'lw-1', title: '1.1 Cấu trúc đề thi MOS Word 2019/365 mới nhất', duration: '12:45', isPreview: true },
          { id: 'lw-2', title: '1.2 Tạo, lưu và thiết lập tùy chọn bảo mật văn bản', duration: '18:20', isPreview: true },
          { id: 'lw-3', title: '1.3 Định dạng trang, lề và Watermark theo yêu cầu bài thi', duration: '15:10' },
        ],
      },
      {
        id: 'mod-w2',
        title: 'Chương 2: Định dạng Văn bản & Đoạn văn chuyên nghiệp',
        lessons: [
          { id: 'lw-4', title: '2.1 Sử dụng Styles, Indents và Line Spacing', duration: '22:15', fileUrl: '#', fileName: 'BaiTap_Module2_Word.docx' },
          { id: 'lw-5', title: '2.2 Tìm kiếm & Thay thế nâng cao (Find & Replace / Special Chars)', duration: '16:40' },
          { id: 'lw-6', title: '2.3 Định dạng danh sách Bullets & Numbering tự động', duration: '14:30' },
        ],
      },
      {
        id: 'mod-w3',
        title: 'Chương 3: Làm việc với Bảng (Tables) và Danh sách (Lists)',
        lessons: [
          { id: 'lw-7', title: '3.1 Tạo Bảng, định dạng Cell styles & Table properties', duration: '25:00', fileUrl: '#', fileName: 'ThaoTac_Bang_Word.docx' },
          { id: 'lw-8', title: '3.2 Sắp xếp dữ liệu & Tính toán công thức trong Bảng', duration: '19:50' },
        ],
      },
      {
        id: 'mod-w4',
        title: 'Chương 4: Đề thi thử mô phỏng Certiport MOS Word (5 Projects)',
        lessons: [
          { id: 'lw-9', title: '4.1 Giải chi tiết Đề thi thử Project 1 - 3', duration: '45:00', isPreview: true },
          { id: 'lw-10', title: '4.2 Giải chi tiết Đề thi thử Project 4 - 5 & Mẹo tránh mất điểm', duration: '50:15' },
        ],
      },
    ],
  },
  {
    id: 'mos-excel-2019',
    title: 'Khóa Học MOS Excel 2019/365 Specialist - Thành Thạo Xử Lý Dữ Liệu',
    slug: 'mos-excel-2019',
    category: 'excel',
    categoryLabel: 'MOS Excel',
    price: 520000,
    originalPrice: 890000,
    badge: 'Khuyên dùng',
    badgeType: 'hot',
    level: 'Mọi cấp độ',
    duration: '18 Giờ học',
    lessonsCount: 38,
    rating: 5.0,
    reviewsCount: 418,
    studentsCount: 1680,
    image: '/MOS1000_Assets/assets/images/products/khoa-hoc-excel/excel-nang-cao.jpg',
    desc: 'Luyện thi MOS Excel chuẩn Certiport. Nắm chắc hàm, công thức, biểu đồ và kĩ năng quản lý bảng tính quy mô lớn.',
    fullDescription: 'MOS Excel là chứng chỉ được săn đón hàng đầu bởi các tập đoàn lớn và ngân hàng. Khóa học giúp bạn nắm vững toàn bộ các chủ đề thi Excel 2019/365 từ quản lý ô bảng tính, định dạng điều kiện, các hàm xử lý chuỗi - logic - dò tìm đến vẽ biểu đồ chuẩn chỉnh.',
    instructor: {
      name: 'TS. Trần Hoàng Nam',
      title: 'Chuyên gia Phân tích Dữ liệu & MOS Master Instructor',
      avatar: '/MOS1000_Assets/assets/images/logo/logo-MOS1000.png',
    },
    modules: [
      {
        id: 'mod-e1',
        title: 'Chương 1: Quản lý Trang tính (Worksheet) & Vùng Dữ liệu',
        lessons: [
          { id: 'le-1', title: '1.1 Tổng quan đề thi MOS Excel & Tiêu chuẩn tính điểm', duration: '14:10', isPreview: true },
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
      {
        id: 'mod-e3',
        title: 'Chương 3: Trực quan hóa Dữ liệu với Biểu đồ (Charts) & Sparklines',
        lessons: [
          { id: 'le-6', title: '3.1 Tạo và chỉnh sửa Biểu đồ Cột, Đường, Tròn chuẩn yêu cầu bài thi', duration: '22:45' },
          { id: 'le-7', title: '3.2 Định dạng chi tiết Chart Elements, Legend & Data Labels', duration: '18:10' },
        ],
      },
      {
        id: 'mod-e4',
        title: 'Chương 4: Đề thi thử MOS Excel 2019/365 thực chiến (6 Projects)',
        lessons: [
          { id: 'le-8', title: '4.1 Giải bộ Đề Thi Thử Project 1, 2, 3', duration: '55:00', isPreview: true },
          { id: 'le-9', title: '4.2 Giải bộ Đề Thi Thử Project 4, 5, 6 & Tổng kết', duration: '60:00' },
        ],
      },
    ],
  },
  {
    id: 'mos-powerpoint-2019',
    title: 'Khóa Học MOS PowerPoint 2019/365 - Thiết Kế Slide Đẳng Cấp',
    slug: 'mos-powerpoint-2019',
    category: 'powerpoint',
    categoryLabel: 'MOS PowerPoint',
    price: 450000,
    originalPrice: 790000,
    badge: 'Mới',
    badgeType: 'new',
    level: 'Mọi cấp độ',
    duration: '12 Giờ học',
    lessonsCount: 26,
    rating: 4.8,
    reviewsCount: 198,
    studentsCount: 890,
    image: '/MOS1000_Assets/assets/images/products/khoa-hoc-powerpoint/powerpoint-nang-cao.jpg',
    desc: 'Luyện thi MOS PowerPoint bài bản. Hướng dẫn tạo bài thuyết trình chuyên nghiệp, hiệu ứng chuyển slide & animation đỉnh cao.',
    fullDescription: 'Khóa học MOS PowerPoint giúp bạn thiết kế những slide thuyết trình hiện đại, ấn tượng đồng thời đáp ứng 100% các tiêu chí đánh giá của Certiport. Học cách làm việc với Slide Master, nhúng video, audio, bảng biểu, sơ đồ SmartArt và các hiệu ứng Morph.',
    instructor: {
      name: 'ThS. Lê Thùy Trang',
      title: 'Chuyên gia Thiết kế Slide & Presentation Master',
      avatar: '/MOS1000_Assets/assets/images/logo/logo-MOS1000.png',
    },
    modules: [
      {
        id: 'mod-p1',
        title: 'Chương 1: Quản lý Bài Thuyết Trình & Slide Master',
        lessons: [
          { id: 'lp-1', title: '1.1 Cấu trúc bài thi MOS PowerPoint & Thang điểm', duration: '11:00', isPreview: true },
          { id: 'lp-2', title: '1.2 Tạo Slide Master, Layout tùy chỉnh & Header/Footer', duration: '25:15', fileUrl: '#', fileName: 'SlideMaster_Template.pptx' },
        ],
      },
      {
        id: 'mod-p2',
        title: 'Chương 2: Thêm & Định dạng Đối tượng (Hình ảnh, SmartArt, Shape)',
        lessons: [
          { id: 'lp-3', title: '2.1 Chèn và định dạng Shape, Icons và 3D Models', duration: '20:10' },
          { id: 'lp-4', title: '2.2 Tạo và tùy biến sơ đồ SmartArt, Bảng dữ liệu', duration: '22:40' },
        ],
      },
      {
        id: 'mod-p3',
        title: 'Chương 3: Hiệu ứng Chuyển trang (Transitions) & Animation',
        lessons: [
          { id: 'lp-5', title: '3.1 Áp dụng hiệu ứng Morph và Transitions chuyên nghiệp', duration: '19:30' },
          { id: 'lp-6', title: '3.2 Thiết lập Animation Pane, Trigger và Timing', duration: '26:00' },
        ],
      },
      {
        id: 'mod-p4',
        title: 'Chương 4: Bộ Đề thi thử MOS PowerPoint 2019/365',
        lessons: [
          { id: 'lp-7', title: '4.1 Giải chi tiết Đề thi thử Project 1 - 4', duration: '50:00', isPreview: true },
        ],
      },
    ],
  },
  {
    id: 'mos-combo-3in1',
    title: 'Gói Combo 3 In 1: MOS Word + Excel + PowerPoint (Tiết Kiệm 50%)',
    slug: 'mos-combo-3in1',
    category: 'combo',
    categoryLabel: 'Gói Combo MOS',
    price: 990000,
    originalPrice: 2530000,
    badge: 'Tiết kiệm 50%',
    badgeType: 'sale',
    level: 'Mọi cấp độ',
    duration: '45 Giờ học',
    lessonsCount: 96,
    rating: 5.0,
    reviewsCount: 610,
    studentsCount: 3100,
    image: '/MOS1000_Assets/assets/images/products/khoa-hoc-mos-2019/MOS-2019.jpg',
    desc: 'Trọn bộ 3 chứng chỉ MOS Word, Excel và PowerPoint. Tặng kèm Ngân hàng Đề thi thử mô phỏng thi thật 1000 điểm.',
    fullDescription: 'Gói Combo 3 môn MOS giúp bạn tiết kiệm chi phí tối đa và sở hữu ngay cả 3 chứng chỉ tin học văn phòng quốc tế có giá trị trọn đời. Khóa học tặng kèm kho đề thi thử cập nhật liên tục và quyền truy cập nhóm hỗ trợ 24/7.',
    instructor: {
      name: 'Đội ngũ Giảng viên MOS Master',
      title: 'Certiport Master Instructors Team',
      avatar: '/MOS1000_Assets/assets/images/logo/logo-MOS1000.png',
    },
    modules: [
      {
        id: 'mod-c1',
        title: 'Phần 1: Trọn bộ Khóa học MOS Word 2019/365 Specialist',
        lessons: [
          { id: 'lc-1', title: 'Toàn bộ 32 bài giảng MOS Word & File thực hành', duration: '15 Giờ' },
        ],
      },
      {
        id: 'mod-c2',
        title: 'Phần 2: Trọn bộ Khóa học MOS Excel 2019/365 Specialist',
        lessons: [
          { id: 'lc-2', title: 'Toàn bộ 38 bài giảng MOS Excel & File thực hành', duration: '18 Giờ' },
        ],
      },
      {
        id: 'mod-c3',
        title: 'Phần 3: Trọn bộ Khóa học MOS PowerPoint 2019/365 Specialist',
        lessons: [
          { id: 'lc-3', title: 'Toàn bộ 26 bài giảng MOS PowerPoint & File thực hành', duration: '12 Giờ' },
        ],
      },
    ],
  },
  {
    id: 'mos-excel-expert',
    title: 'Khóa Học MOS Excel Expert 2019/365 - Chuyên Gia Bảng Tính',
    slug: 'mos-excel-expert',
    category: 'excel',
    categoryLabel: 'MOS Excel',
    price: 650000,
    originalPrice: 1100000,
    badge: 'Expert',
    badgeType: 'hot',
    level: 'Nâng cao',
    duration: '20 Giờ học',
    lessonsCount: 35,
    rating: 4.9,
    reviewsCount: 165,
    studentsCount: 620,
    image: '/MOS1000_Assets/assets/images/products/khoa-hoc-excel/excel-mo-rong.jpg',
    desc: 'Chương trình nâng cao chinh phục chứng chỉ MOS Excel Expert. Nắm vững PivotTable, Power Query, Macros và phân tích dữ liệu nâng cao.',
    fullDescription: 'Trở thành Chuyên gia Excel hàng đầu với khóa học MOS Excel Expert. Nắm chắc kỹ thuật phân tích mảng, xử lý PivotTable nâng cao, tạo Dashboard báo cáo và ghi đĩa tự động hóa bằng Macro.',
    instructor: {
      name: 'TS. Trần Hoàng Nam',
      title: 'Chuyên gia Phân tích Dữ liệu & MOS Master Instructor',
      avatar: '/MOS1000_Assets/assets/images/logo/logo-MOS1000.png',
    },
    modules: [
      {
        id: 'mod-ee1',
        title: 'Chương 1: Mẫu Trang tính Nâng cao (Advanced Templates & Formats)',
        lessons: [
          { id: 'lee-1', title: '1.1 Cấu trúc đề thi MOS Excel Expert 2019', duration: '15:00', isPreview: true },
          { id: 'lee-2', title: '1.2 Tạo Custom Number Formats và Custom Color Themes', duration: '22:00' },
        ],
      },
      {
        id: 'mod-ee2',
        title: 'Chương 2: Phân tích Dữ liệu với PivotTable & PivotChart Nâng Cao',
        lessons: [
          { id: 'lee-3', title: '2.1 Xây dựng PivotTable, Calculated Fields & Slicers', duration: '35:00' },
          { id: 'lee-4', title: '2.2 Tự động hóa với Record Macros và VBA cơ bản', duration: '40:00' },
        ],
      },
    ],
  },
  {
    id: 'mos-word-expert',
    title: 'Khóa Học MOS Word Expert 2019/365 - Chuyên Gia Văn Bản Nâng Cao',
    slug: 'mos-word-expert',
    category: 'word',
    categoryLabel: 'MOS Word',
    price: 590000,
    originalPrice: 990000,
    badge: 'Expert',
    badgeType: 'new',
    level: 'Nâng cao',
    duration: '16 Giờ học',
    lessonsCount: 30,
    rating: 4.9,
    reviewsCount: 142,
    studentsCount: 510,
    image: '/MOS1000_Assets/assets/images/products/khoa-hoc-word/word-nang-cao.jpg',
    desc: 'Luyện thi MOS Word Expert. Hướng dẫn thiết lập Mail Merge, quản lý Index, Table of Contents, Trích dẫn APA/MLA và bảo mật nâng cao.',
    fullDescription: 'Khóa học nâng cao giúp bạn trở thành Chuyên gia soạn thảo tài liệu chuẩn báo cáo quốc tế, hợp đồng pháp lý và luận văn thạc sĩ/tiến sĩ với Word Expert.',
    instructor: {
      name: 'ThS. Nguyễn Văn Minh',
      title: 'Chuyên gia Giảng dạy MOS Certiport Certified',
      avatar: '/MOS1000_Assets/assets/images/logo/logo-MOS1000.png',
    },
    modules: [
      {
        id: 'mod-we1',
        title: 'Chương 1: Quản lý Tài liệu Nâng cao & Trộn Thư (Mail Merge)',
        lessons: [
          { id: 'lwe-1', title: '1.1 Tổng quan đề thi MOS Word Expert', duration: '14:00', isPreview: true },
          { id: 'lwe-2', title: '1.2 Tạo Mail Merge nâng cao với dữ liệu từ Excel', duration: '28:00' },
        ],
      },
    ],
  },
];

export function formatVND(amount: number): string {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}
