import { GoNumber } from 'react-icons/go';
import { ImCalendar } from 'react-icons/im';
import { PiChartBar } from 'react-icons/pi';
import { TbGitBranchDeleted, TbReportSearch } from 'react-icons/tb';
import { LiaUsersSolid } from 'react-icons/lia';

import { BiSolidCategory} from 'react-icons/bi';
import { PiQuestionBold } from 'react-icons/pi';
import {
  FaDownload,
  FaFileAlt,
  FaFileImage,
  FaFileVideo,
  FaHandHoldingWater,
  FaQuestionCircle,
  FaRegListAlt,
} from 'react-icons/fa';
import {
  FaHandsHoldingCircle,
  FaHandshakeAngle,
  FaUserPlus,
  FaUserShield,
  FaUsers,
} from 'react-icons/fa6';
import { GiIncubator, GiLevelThreeAdvanced, GiTimeBomb } from 'react-icons/gi';
import { IoBusiness, IoSettings } from 'react-icons/io5';
import { MdCallMissedOutgoing, MdFoodBank, MdMiscellaneousServices, MdOutlineProductionQuantityLimits, MdPermMedia, MdReviews, MdWaterDrop } from 'react-icons/md';
import { RiContactsBook2Fill, RiUserStarLine } from 'react-icons/ri';
import { AiOutlineProject } from "react-icons/ai";

// Note: do not add href in the label object, it is rendering as label
export const menuItemsHaydrogen = [
  // label start
  {
    name: 'Home Mangement',
    permitions: '',
    nameAr: 'الصفحة الرئيسية',
  },
  // label end
  {
    name: 'Introduction Screen',
    nameAr: 'الصفحة الأفتتاحية',
    href: '/attachments-pages?page_id=1',
    icon: <FaHandsHoldingCircle />,
    permitions: 'all_brands',
  },
  {
    name: 'Download Apps',
    nameAr: 'الصفحة الأفتتاحية',
    href: '/attachments?section_id=1',
    icon: <FaDownload/>,
    permitions: 'all_brands',
  },
  {
    name: 'Our Services',
    nameAr: 'خدماتنا',
    href: '/attachments?section_id=2',
    icon: <MdMiscellaneousServices />    ,
    permitions: 'all_brands',
  },
  {
    name: 'About Us',
    nameAr: 'من نحن',
    href: '/attachments?section_id=3',
    icon: <IoBusiness />    ,
    permitions: 'all_brands',
  },

  {
    name: 'About Us',
    permitions: '',
    nameAr: 'من نحن',
  },
  {
    name: 'Introduction Screen',
    nameAr: 'الصفحة الأفتتاحية',
    href: '/attachments-pages?page_id=2',
    icon: <FaHandsHoldingCircle />,
    permitions: 'all_brands',
  },
  {
    name: 'About Us',
    nameAr: 'من نحن',
    href: '/attachments?section_id=4',
    icon: <IoBusiness />    ,
    permitions: 'all_brands',
  },
  {
    name: 'How We Make quality Foods',
    nameAr: 'كيف نصنع أغذية عالية الجودة',
    href: '/attachments?section_id=5',
    icon: <MdFoodBank />    ,
    permitions: 'all_brands',
  },
  {
    name: 'Why Choose Us',
    nameAr: 'لماذا تختارنا',
    href: '/attachments?section_id=6',
    icon: <PiQuestionBold />    ,
    permitions: 'all_brands',
  },
  {
    name: 'Contact',
    permitions: '',
    nameAr: 'تواصل معنا',
  },
  {
    name: 'Introduction Screen',
    nameAr: 'الصفحة الأفتتاحية',
    href: '/attachments-pages?page_id=4',
    icon: <FaHandsHoldingCircle />,
    permitions: 'all_brands',
  },
    {
    name: 'Contact List',
    nameAr: 'قائمة اتصل بنا',
    href: '/contacts',
    icon: <RiContactsBook2Fill />,
    permitions: 'all_brands',
  },
  {
    name: 'Branches',
    nameAr: 'الفروع',
    href: '/branches',
    icon: <TbGitBranchDeleted />    ,
    permitions: 'all_brands',
  },
    {
    name: 'Client Review',
    nameAr: 'الفروع',
    href: '/client-review',
    icon: <MdReviews />,
    permitions: 'all_brands',
  },


  {
    name: 'Features',
    permitions: '',
    nameAr: 'المزايا',
  },
  //   {
  //   name: 'Brand',
  //   nameAr: 'العلامات التجارية',
  //   href: '/brands',
  //   icon: <AiOutlineProject />,
  //   permitions: 'all_brands',
  // },
    {
    name: 'Product',
    nameAr: 'المنتجات',
    href: '/product',
    icon: <MdOutlineProductionQuantityLimits />    ,
    permitions: 'all_brands',
  },
    {
    name: 'Category',
    nameAr: 'الفئات',
    href: '/category',
    icon: <BiSolidCategory/>,
    permitions: 'all_brands',
  },
  // {
  //   name: 'Services',
  //   permitions: '',
  //   nameAr: 'الخدمات',
  // },
  // {
  //   name: 'Individual',
  //   nameAr: 'الافراد',
  //   href: '/services-individuals',
  //   icon: <FaUserPlus />,
  //   permitions: 'all_brands',
  // },
  // {
  //   name: 'Business',
  //   nameAr: 'الشركات',
  //   href: '/services-bussness',
  //   icon: <RiUserStarLine />,
  //   permitions: 'all_brands',
  // },
    {
    name: 'Settings',
    permitions: '',
    nameAr: 'الإعدادات',
  },
  // label end
  {
    name: 'Settings',
    nameAr: 'الإعدادات',
    href: '/settings',
    icon: <IoSettings />,
    permitions: 'all_brands',
  },

  //   {
  //   name: 'Services',
  //   nameAr: 'قائمة المتقدمين',
  //   href: '/services',
  //   icon: <FaUserPlus />,
  //   permitions: 'all_brands',
  // },

  // //------------------------------------------------------
  // // label start
  // {
  //   name: 'About Center',
  //   permitions: '',
  //   nameAr: 'عن المركز',
  // },
  // // label end

  // {
  //   name: 'about center',
  //   nameAr: 'عن المركز',
  //   href: '/attachments?section_id=1',
  //   icon: <FaHandsHoldingCircle />,
  //   // permitions:"all_brands",
  // },
  // {
  //   name: 'Center objectives',
  //   nameAr: 'أهداف المركز',
  //   href: '/attachments?section_id=2',
  //   icon: <FaHandshakeAngle />,
  //   // permitions:"all_brands",
  // },
  // {
  //   name: 'Vision and mission',
  //   nameAr: 'الرؤية والرسالة',
  //   href: '/attachments?section_id=3',
  //   icon: <MdCallMissedOutgoing />,
  //   // permitions:"all_brands",
  // },
  // {
  //   name: 'incubator',
  //   permitions: '',
  //   nameAr: 'الحاضنه',
  // },
  // // label end
  // {
  //   name: 'Water technology incubator',
  //   nameAr: 'الاحصائيات والأرقام    ',
  //   href: '//attachments?section_id=8',
  //   icon: <MdWaterDrop />,
  //   permitions: 'all_brands',
  // },
  // {
  //   name: 'Water technology incubator',
  //   nameAr: 'الاحصائيات والأرقام    ',
  //   href: '//attachments?section_id=9',
  //   icon: <FaHandHoldingWater />,
  //   permitions: 'all_brands',
  // },
  // {
  //   name: 'Program advantages',
  //   nameAr: 'الاحصائيات والأرقام    ',
  //   href: '//attachments?section_id=10',
  //   icon: <GiLevelThreeAdvanced />,
  //   permitions: 'all_brands',
  // },

  // {
  //   name: 'Incubator program timeline',
  //   nameAr: 'المخطط الزمني لبرنامج الحاضنة',
  //   href: '//attachments?section_id=12',
  //   icon: <GiTimeBomb />,
  //   permitions: 'all_brands',
  // },
  // {
  //   name: 'Water Technologies Network',
  //   permitions: '',
  //   nameAr: 'شبكة تقنيات المياه',
  // },
  // // label end
  // {
  //   name: 'Reports',
  //   nameAr: 'المقالات',
  //   href: '/reports',
  //   icon: <ImCalendar />,
  //   permitions: 'all_brands',
  // },
  // {
  //   name: 'Incubators',
  //   nameAr: 'المحتضنين',
  //   href: '/incubators',
  //   icon: <GiIncubator />,
  //   permitions: 'all_brands',
  // },
  // {
  //   name: 'Previous Incubators',
  //   nameAr: 'المحتضنين السابقين',
  //   href: '/previous-incubators',
  //   icon: <LiaUsersSolid />,
  //   permitions: 'all_brands',
  // },
  // {
  //   name: 'Team',
  //   nameAr: 'المقالات',
  //   href: '/teams',
  //   icon: <RiUserStarLine />,
  //   permitions: 'all_brands',
  // },
  // {
  //   name: 'Contact Us List',
  //   nameAr: 'قائمة اتصل بنا',
  //   href: '/contacts',
  //   icon: <RiContactsBook2Fill />,
  //   permitions: 'all_brands',
  // },
  // {
  //   name: 'Application Form List',
  //   nameAr: 'قائمة المتقدمين',
  //   href: '/application-form',
  //   icon: <FaUserPlus />,
  //   permitions: 'all_brands',
  // },
  // {
  //   name: 'Registration Form Categories',
  //   nameAr: 'أقسام المسجلين',
  //   href: '/registration-form-categories',
  //   icon: <BiSolidCategory />,
  //   permitions: 'all_brands',
  // },
  // {
  //   name: 'Registration Form List',
  //   nameAr: 'قائمة المسجلين',
  //   href: '/registration-form-list',
  //   icon: <FaUsers />,
  //   permitions: 'all_brands',
  // },
  // {
  //   name: 'Newsletter List',
  //   nameAr: 'قائمة النشرة الاخبارية',
  //   href: '/newsletter-list',
  //   icon: <FaRegListAlt />,
  //   permitions: 'all_brands',
  // },
  // {
  //   name: 'FAQs',
  //   nameAr: 'الأسئلة الشائعة',
  //   href: '/faqs',
  //   icon: <FaQuestionCircle />,
  //   permitions: 'all_brands',
  // },
  // {
  //   name: 'Media Center',
  //   permitions: '',
  //   nameAr: 'مركز الوسائط',
  // },
  // {
  //   name: 'Visual Identity',
  //   nameAr: 'الهوية البصرية',
  //   href: '/media-center-files',
  //   icon: <FaFileAlt />,
  //   permitions: 'all_brands',
  // },
  // {
  //   name: 'Images Library',
  //   nameAr: 'مكتبة الصور',
  //   href: '/media-center-images',
  //   icon: <FaFileImage />,
  //   permitions: 'all_brands',
  // },
  // {
  //   name: 'Videos Library',
  //   nameAr: 'المكتبة المرئية',
  //   href: '/media-center-videos',
  //   icon: <FaFileVideo />,
  //   permitions: 'all_brands',
  // },
  // {
  //   name: 'Partners',
  //   permitions: '',
  //   nameAr: 'الشركاء',
  // },
  // // label end
  // {
  //   name: 'Partners',
  //   nameAr: 'المقالات',
  //   href: '/partners',
  //   icon: <FaUserShield />,
  //   permitions: 'all_brands',
  // },

  // {
  //   name: 'Dashboard',
  //   nameAr: 'لوحة تحكم',
  //   href: '/',
  //   icon: <PiChartBar />,
  //   permitions: 'all_brands',
  // },
];
