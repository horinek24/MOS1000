export interface Question {
  id: number;
  questionText: string;
  options: { key: 'A' | 'B' | 'C' | 'D'; text: string }[];
  correctOption: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  category: 'word' | 'excel' | 'powerpoint';
}

export interface Quiz {
  id: string;
  title: string;
  subject: 'word' | 'excel' | 'powerpoint';
  subjectLabel: string;
  durationMins: number;
  passScore: number;
  totalQuestions: number;
  description: string;
  badge: string;
  questions: Question[];
}

export const QUIZZES_DATA: Quiz[] = [
  {
    id: 'quiz-mos-word',
    title: 'Đề Thi Thử MOS Word 2019/365 - Bộ Đề Mô Phỏng Certiport #1',
    subject: 'word',
    subjectLabel: 'MOS Word',
    durationMins: 50,
    passScore: 700,
    totalQuestions: 5,
    description: 'Bộ đề thi thử trắc nghiệm & thao tác MOS Word bám sát cấu trúc bài thi quốc tế Certiport.',
    badge: 'Đề thi chuẩn',
    questions: [
      {
        id: 1,
        questionText: 'Trong Microsoft Word 2019, thao tác nào dưới đây dùng để áp dụng khung chìm (Watermark) chữ "CONFIDENTIAL" cho toàn bộ tài liệu?',
        options: [
          { key: 'A', text: 'Thẻ Home -> Font -> Watermark' },
          { key: 'B', text: 'Thẻ Design -> Trang trí trang (Page Background) -> Watermark -> Chọn Confidential' },
          { key: 'C', text: 'Thẻ Layout -> Page Setup -> Watermark' },
          { key: 'D', text: 'Thẻ View -> Show -> Watermark' },
        ],
        correctOption: 'B',
        explanation: 'Trong Word 2019/365, tính năng Watermark nằm ở thẻ Design trong nhóm Page Background.',
        category: 'word',
      },
      {
        id: 2,
        questionText: 'Để thêm khoảng cách 12pt vào sau mỗi đoạn văn (Space After) cho đoạn văn bản đang chọn, bạn thao tác ở đâu?',
        options: [
          { key: 'A', text: 'Thẻ Layout -> Nhóm Paragraph -> Mục After nhập 12 pt' },
          { key: 'B', text: 'Thẻ Home -> Nhóm Font -> Size 12' },
          { key: 'C', text: 'Thẻ View -> Zoom -> 12%' },
          { key: 'D', text: 'Thẻ Insert -> Spacing -> 12 pt' },
        ],
        correctOption: 'A',
        explanation: 'Khoảng cách giữa các đoạn (Before/After) được thiết lập tại thẻ Layout (hoặc thẻ Home -> hộp thoại Paragraph).',
        category: 'word',
      },
      {
        id: 3,
        questionText: 'Tính năng nào giúp tự động tạo Mục Lục (Table of Contents) dựa trên các tiêu đề đã gán Heading styles?',
        options: [
          { key: 'A', text: 'Thẻ Insert -> Table of Contents' },
          { key: 'B', text: 'Thẻ References -> Table of Contents' },
          { key: 'C', text: 'Thẻ View -> Outline -> Table of Contents' },
          { key: 'D', text: 'Thẻ Mailings -> Table of Contents' },
        ],
        correctOption: 'B',
        explanation: 'Thẻ References chứa nhóm công cụ Table of Contents để chèn mục lục tự động.',
        category: 'word',
      },
      {
        id: 4,
        questionText: 'Trong một Bảng (Table), làm thế nào để lặp lại hàng tiêu đề ở đầu mỗi trang khi bảng kéo dài qua nhiều trang?',
        options: [
          { key: 'A', text: 'Chọn hàng tiêu đề -> Thẻ Table Design -> Header Row' },
          { key: 'B', text: 'Chọn hàng tiêu đề -> Thẻ Layout (Table Tools) -> Nhóm Data -> Repeat Header Rows' },
          { key: 'C', text: 'Thẻ Page Layout -> Print Titles' },
          { key: 'D', text: 'Copy hàng tiêu đề dán thủ công sang trang tiếp theo' },
        ],
        correctOption: 'B',
        explanation: 'Tính năng Repeat Header Rows trong Table Tools Layout giúp tự động lặp lại hàng tiêu đề của bảng trên các trang sau.',
        category: 'word',
      },
      {
        id: 5,
        questionText: 'Để xuất tài liệu Word dưới định dạng PDF với thiết lập chỉ lưu các trang từ 1 đến 3, bạn thực hiện:',
        options: [
          { key: 'A', text: 'File -> Save As -> Chọn PDF -> Click Options -> Nhập Page(s) From 1 To 3 -> OK -> Save' },
          { key: 'B', text: 'File -> Print -> Export to PDF' },
          { key: 'C', text: 'Thẻ Home -> Export -> PDF 1-3' },
          { key: 'D', text: 'Xóa các trang khác rồi Save As PDF' },
        ],
        correctOption: 'A',
        explanation: 'Hộp thoại Save As PDF cho phép tùy chọn phạm vi trang xuất file thông qua nút Options.',
        category: 'word',
      },
    ],
  },
  {
    id: 'quiz-mos-excel',
    title: 'Đề Thi Thử MOS Excel 2019/365 - Bộ Đề Mô Phỏng Certiport #1',
    subject: 'excel',
    subjectLabel: 'MOS Excel',
    durationMins: 50,
    passScore: 700,
    totalQuestions: 5,
    description: 'Bộ đề thi thử tính toán, hàm xử lý dữ liệu và vẽ biểu đồ MOS Excel chuẩn Certiport.',
    badge: 'Đề thi chuẩn',
    questions: [
      {
        id: 1,
        questionText: 'Cú pháp hàm VLOOKUP nào dưới đây là đúng để dò tìm giá trị ở ô A2 trong bảng tham chiếu từ ô $D$2 đến $F$10 và lấy dữ liệu ở cột 3 (dò tìm chính xác)?',
        options: [
          { key: 'A', text: '=VLOOKUP(A2, $D$2:$F$10, 3, FALSE)' },
          { key: 'B', text: '=VLOOKUP(3, A2, $D$2:$F$10, TRUE)' },
          { key: 'C', text: '=VLOOKUP(A2, 3, $D$2:$F$10, 0)' },
          { key: 'D', text: '=VLOOKUP($D$2:$F$10, A2, 3, FALSE)' },
        ],
        correctOption: 'A',
        explanation: 'Cú pháp chuẩn của VLOOKUP: VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup]). FALSE hoặc 0 đại diện cho dò tìm chính xác.',
        category: 'excel',
      },
      {
        id: 2,
        questionText: 'Làm thế nào để cố định dòng tiêu đề thứ 1 (Freeze Top Row) khi cuộn chuột xuống các dòng bên dưới?',
        options: [
          { key: 'A', text: 'Thẻ Home -> Freeze Top Row' },
          { key: 'B', text: 'Thẻ View -> Window -> Freeze Panes -> Freeze Top Row' },
          { key: 'C', text: 'Thẻ Page Layout -> Freeze Row 1' },
          { key: 'D', text: 'Right-click dòng 1 -> Lock Row' },
        ],
        correctOption: 'B',
        explanation: 'Thẻ View trong nhóm Window chứa nút lệnh Freeze Panes với tùy chọn Freeze Top Row.',
        category: 'excel',
      },
      {
        id: 3,
        questionText: 'Để áp dụng định dạng màu nền Đỏ nhạt cho các ô có giá trị nhỏ hơn 50, bạn sử dụng công cụ nào?',
        options: [
          { key: 'A', text: 'Thẻ Home -> Cell Styles' },
          { key: 'B', text: 'Thẻ Home -> Styles -> Conditional Formatting -> Highlight Cells Rules -> Less Than...' },
          { key: 'C', text: 'Thẻ Data -> Data Validation' },
          { key: 'D', text: 'Thẻ Insert -> Format Rules' },
        ],
        correctOption: 'B',
        explanation: 'Conditional Formatting (Định dạng có điều kiện) nằm ở thẻ Home nhóm Styles.',
        category: 'excel',
      },
      {
        id: 4,
        questionText: 'Công thức nào dùng để đếm số lượng ô có chứa dữ liệu kiểu số trong vùng từ B2 đến B20?',
        options: [
          { key: 'A', text: '=COUNTA(B2:B20)' },
          { key: 'B', text: '=COUNT(B2:B20)' },
          { key: 'C', text: '=COUNTIF(B2:B20, "Number")' },
          { key: 'D', text: '=SUM(B2:B20)' },
        ],
        correctOption: 'B',
        explanation: 'Hàm COUNT dùng để đếm các ô chứa dữ liệu số. COUNTA dùng để đếm ô chứa bất kỳ dữ liệu nào (không rỗng).',
        category: 'excel',
      },
      {
        id: 5,
        questionText: 'Tính năng nào trong Excel dùng để loại bỏ các ô dữ liệu bị trùng lặp (Duplicate Rows)?',
        options: [
          { key: 'A', text: 'Thẻ Home -> Clear Duplicates' },
          { key: 'B', text: 'Thẻ Data -> Data Tools -> Remove Duplicates' },
          { key: 'C', text: 'Thẻ Review -> Track Changes' },
          { key: 'D', text: 'Thẻ Insert -> Filter Duplicates' },
        ],
        correctOption: 'B',
        explanation: 'Tính năng Remove Duplicates nằm ở thẻ Data nhóm Data Tools.',
        category: 'excel',
      },
    ],
  },
  {
    id: 'quiz-mos-powerpoint',
    title: 'Đề Thi Thử MOS PowerPoint 2019/365 - Bộ Đề Mô Phỏng Certiport #1',
    subject: 'powerpoint',
    subjectLabel: 'MOS PowerPoint',
    durationMins: 50,
    passScore: 700,
    totalQuestions: 5,
    description: 'Bộ đề thi thử thiết kế slide, hiệu ứng chuyển trang và làm việc với Slide Master MOS PowerPoint.',
    badge: 'Đề thi chuẩn',
    questions: [
      {
        id: 1,
        questionText: 'Để áp dụng hiệu ứng chuyển slide "Morph" cho tất cả các slide trong bài trình chiếu, bạn thực hiện:',
        options: [
          { key: 'A', text: 'Thẻ Transitions -> Chọn Morph -> Nhóm Timing bấm Apply To All' },
          { key: 'B', text: 'Thẻ Animations -> Morph -> Apply All' },
          { key: 'C', text: 'Thẻ Slide Show -> Morph Effects' },
          { key: 'D', text: 'Thẻ Design -> Variants -> Morph' },
        ],
        correctOption: 'A',
        explanation: 'Hiệu ứng chuyển trang nằm ở thẻ Transitions. Để áp dụng cho toàn bộ slide bấm Apply To All.',
        category: 'powerpoint',
      },
      {
        id: 2,
        questionText: 'Tính năng Slide Master dùng để làm gì?',
        options: [
          { key: 'A', text: 'Tạo bài thuyết trình tự động bằng AI' },
          { key: 'B', text: 'Thiết lập định dạng chung (Font, Logo, Background, Layout) nhất quán cho toàn bộ các slide' },
          { key: 'C', text: 'Xuất bài trình chiếu ra file mp4' },
          { key: 'D', text: 'Chèn âm thanh nền cho từng slide' },
        ],
        correctOption: 'B',
        explanation: 'Slide Master ở thẻ View giúp quản lý và đồng bộ hóa giao diện mẫu cho tất cả các slide.',
        category: 'powerpoint',
      },
      {
        id: 3,
        questionText: 'Làm thế nào để chuyển đổi một danh sách Bullets thông thường thành sơ đồ đồ họa SmartArt?',
        options: [
          { key: 'A', text: 'Chọn danh sách -> Thẻ Home -> Nhóm Paragraph -> Convert to SmartArt' },
          { key: 'B', text: 'Thẻ Insert -> SmartArt -> Paste List' },
          { key: 'C', text: 'Thẻ Design -> SmartArt Layout' },
          { key: 'D', text: 'Right-click -> Format Shape' },
        ],
        correctOption: 'A',
        explanation: 'Nút Convert to SmartArt ở thẻ Home nhóm Paragraph giúp biến danh sách văn bản thành sơ đồ quy trình/cấu trúc đẹp mắt.',
        category: 'powerpoint',
      },
      {
        id: 4,
        questionText: 'Để cài đặt cho video tự động phát (Automatically) khi chuyển đến slide chứa video đó, bạn thao tác ở thẻ nào?',
        options: [
          { key: 'A', text: 'Thẻ Video Format' },
          { key: 'B', text: 'Thẻ Playback (Video Tools) -> Nhóm Video Options -> Start: Automatically' },
          { key: 'C', text: 'Thẻ Animations -> Start With Previous' },
          { key: 'D', text: 'Thẻ Transitions -> Auto Play' },
        ],
        correctOption: 'B',
        explanation: 'Thẻ Playback xuất hiện khi chọn Video chứa các tùy chọn phát tự động, lặp lại hoặc toàn màn hình.',
        category: 'powerpoint',
      },
      {
        id: 5,
        questionText: 'Cách ẩn một slide (Hide Slide) để slide đó không xuất hiện khi đang trình chiếu (Slide Show)?',
        options: [
          { key: 'A', text: 'Right-click vào slide ở cột bên trái -> Chọn Hide Slide (hoặc Thẻ Slide Show -> Hide Slide)' },
          { key: 'B', text: 'Xóa slide khỏi bài trình chiếu' },
          { key: 'C', text: 'Thẻ View -> Outline View -> Delete Slide' },
          { key: 'D', text: 'Khóa slide bằng password' },
        ],
        correctOption: 'A',
        explanation: 'Hide Slide ẩn slide khỏi chế độ trình chiếu nhưng vẫn giữ lại trong file làm việc.',
        category: 'powerpoint',
      },
    ],
  },
];
