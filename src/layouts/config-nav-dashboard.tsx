import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

export const navData = [
  {
    title: 'Tổng Quan',
    path: '/dashboard/overview',
    icon: icon('ic-analytics'),
    info: (
      <Label color="success" variant="filled">
        NEW
      </Label>
    ),
  },
  {
    title: 'Quản Lý Tham Dự',
    path: '/dashboard/rsvp',
    icon: icon('ic-user'),
    info: (
      <Label color="error" variant="filled">
        0
      </Label>
    ),
  },
  {
    title: 'Quản Lý Lời Chúc',
    path: '/dashboard/wishes',
    icon: icon('ic-blog'),
    info: (
      <Label color="success" variant="filled">
        0
      </Label>
    ),
  },
  {
    title: 'Thống Kê',
    path: '/dashboard/stats',
    icon: icon('ic-cart'),
  },
  {
    title: 'Website',
    path: '/wedding',
    icon: icon('ic-disabled'),
  },
  {
    title: 'Đăng Xuất',
    path: '/auth/login',
    icon: icon('ic-lock'),
  },
];
