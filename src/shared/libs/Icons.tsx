import { LuLayoutDashboard } from 'react-icons/lu';
import { MdOutlineNoteAlt, MdOutlineTipsAndUpdates } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { IoMenuOutline } from 'react-icons/io5';

import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

import { IoMdSettings } from 'react-icons/io';
import { IoLogOut } from 'react-icons/io5';
import { LuUsers } from 'react-icons/lu';
import { FiBox } from 'react-icons/fi';
import { FaChevronLeft, FaChevronRight, FaPager } from 'react-icons/fa6';
import { MdDeleteOutline } from 'react-icons/md';
import { TbUsersGroup } from 'react-icons/tb';
import { PiWarehouse } from 'react-icons/pi';
import { FaCoins } from 'react-icons/fa';
import { MdKeyboardArrowUp } from 'react-icons/md';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { TbTruckDelivery } from 'react-icons/tb';
import { MdOutlineEventNote } from 'react-icons/md';
import { IoArrowBackOutline } from 'react-icons/io5';
import { RiPagesLine } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';
import { SiRootssage } from 'react-icons/si';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const icons: any = {
  rightArrow: <FaChevronRight />,
  leftArrow: <FaChevronLeft />,
  dashboard: <LuLayoutDashboard className="text-2xl" />,
  orderentry: <MdOutlineNoteAlt className="text-2xl" />,
  updatestatus: <MdOutlineTipsAndUpdates className="text-2xl" />,
  profile: <CgProfile className="text-2xl" />,
  settings: <IoMdSettings className="text-2xl" />,
  logout: <IoLogOut className="text-2xl" />,

  department: <SiRootssage className="text-2xl" />,

  menu: <IoMenuOutline className="text-2xl cursor-pointer" />,
  users: <LuUsers className="text-2xl" />,
  pod: <FiBox className="text-xl" />,
  page: <FaPager className="text-2xl" />,
  delete: <MdDeleteOutline className="text-2xl" />,
  partners: <TbUsersGroup className="text-2xl" />,
  warehouse: <PiWarehouse className="text-xl" />,
  coins: <FaCoins className="text-2xl" />,
  arrowUp: <MdKeyboardArrowUp className="text-2xl" />,
  arrowDown: <MdOutlineKeyboardArrowDown className="text-2xl" />,
  delivery: <TbTruckDelivery className="text-2xl" />,
  event: <MdOutlineEventNote className="text-xl" />,

  back: <IoArrowBackOutline />,
  order: <RiPagesLine className="text-2xl" />,
  update: <FiEdit className="text-xl" />,
  FaFacebook: <FaFacebook size={20} />,
  FaTwitter: <FaTwitter size={20} />,
  FaLinkedin: <FaLinkedin size={20} />,
  FaInstagram: <FaInstagram size={20} />,
};
