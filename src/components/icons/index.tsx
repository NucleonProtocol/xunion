import { CSSProperties, HTMLAttributes, PropsWithChildren } from 'react';
import AntdIcon from '@ant-design/icons';
// import { cn } from '@/utils/classnames';
import LogoSvg from '@/assets/svgs/external/logo.svg';
//
// import NftSvg from '@/assets/svgs/fuctions/nfts.svg';
// import PlusSvg from '@/assets/svgs/operation/plus.svg';
// import DiamondSvg from '@/assets/svgs/fuctions/diamond.svg';
// import SunSvg from '@/assets/svgs/status/sun.svg';
// import MoonSvg from '@/assets/svgs/status/moon.svg';
// import InfoCircleSvg from '@/assets/svgs/status/infor-circle.svg';
//
// import TwitterSvg from '@/assets/svgs/external/Twitter-X.svg';
// import YoutubeSvg from '@/assets/svgs/external/Youtube.svg';
// import DiscordSvg from '@/assets/svgs/external/Discord.svg';
// import MetaLineSvg from '@/assets/svgs/external/Meta-line.svg';
// import TelegramSvg from '@/assets/svgs/external/Telegram.svg';
// import MediumSvg from '@/assets/svgs/external/Medium.svg';
// import RedditSvg from '@/assets/svgs/external/reddit.svg';
// import FacebookSvg from '@/assets/svgs/external/facebook.svg';
// import CoinmarketcapSvg from '@/assets/svgs/external/coinmarketcap.svg';
// import EtherscanSvg from '@/assets/svgs/external/etherscan.svg';
// import GithubSvg from '@/assets/svgs/external/Github-line.svg';
//
// import WalletSvg from '@/assets/svgs/fuctions/wallet.svg';
// import MenuSvg from '@/assets/svgs/operation/hamburg.svg';
// import EditSvg from '@/assets/svgs/operation/edit.svg';
// import DeleteSvg from '@/assets/svgs/operation/trash.svg';
//
// import BookMarkSvg from '@/assets/svgs/fuctions/bookmark.svg';
// import PlaceholderSvg from '@/assets/svgs/fuctions/placeholder.svg';
// import BookMarkFillSvg from '@/assets/svgs/fuctions/bookmark-fill.svg';
// import ChevronLeft from '@/assets/svgs/arrow/chevron-left.svg';
// import ArrowToTopSvg from '@/assets/svgs/arrow/arrow-to-top.svg';
//
// import ChevronLeft2 from '@/assets/svgs/arrow/chevron-left-2.svg';
// import ChevronRight2 from '@/assets/svgs/arrow/chevron-right-2.svg';
// import ChevronRight from '@/assets/svgs/arrow/chevron-right.svg';
// import ArrowLeft from '@/assets/svgs/arrow/arrow-left.svg';
// import ArrowRightUp from '@/assets/svgs/arrow/arrow-right-up.svg';
// import UploadSvg from '@/assets/svgs/arrow/upload.svg';
//
// import FilterSvg from '@/assets/svgs/operation/filter.svg';
// import SearchSvg from '@/assets/svgs/operation/search.svg';
// import DocSvg from '@/assets/svgs/fuctions/doc.svg';
// import ThumbFillSvg from '@/assets/svgs/operation/thumb-fill.svg';
// import ThumbSvg from '@/assets/svgs/operation/thumb.svg';
// import CopySvg from '@/assets/svgs/operation/copy.svg';
// import SignIn from '@/assets/svgs/arrow/sign-in.svg';
// import SignOut from '@/assets/svgs/arrow/sign-out.svg';
// import ChevronExpandSvg from '@/assets/svgs/arrow/chevron-expand.svg';
//
// import NetworkSvg from '@/assets/svgs/fuctions/network.svg';
// import ManageSvg from '@/assets/svgs/fuctions/manage.svg';
// import WarningSvg from '@/assets/svgs/status/warning.svg';
// import WarningFillSvg from '@/assets/svgs/status/warning-fill.svg';
// import XmarkFillSvg from '@/assets/svgs/status/xmark-fill.svg';
// import XmarkSvg from '@/assets/svgs/status/xmark.svg';
// import EllipsisSvg from '@/assets/svgs/status/ellipsis.svg';
// import SlowmoSvg from '@/assets/svgs/status/slowmo.svg';
// import CheckmarkFillSvg from '@/assets/svgs/status/checkmark-fill.svg';
// import CheckmarkSvg from '@/assets/svgs/status/checkmark.svg';
// import ClockSvg from '@/assets/svgs/status/clock.svg';
// import EyeSvg from '@/assets/svgs/status/eye.svg';
// import EyeCloseSvg from '@/assets/svgs/status/eye-close.svg';
//
// // menus
// import AiTools from '@/assets/svgs/menus/ai-tools.svg';
// import Airdrop from '@/assets/svgs/menus/airdrop.svg';
// import Blockchain from '@/assets/svgs/menus/blockchain.svg';
// import Book from '@/assets/svgs/menus/book.svg';
// import Bridges from '@/assets/svgs/menus/bridges.svg';
// import Cr20protocols from '@/assets/svgs/menus/c20-protocols.svg';
// import Dao from '@/assets/svgs/menus/dao.svg';
// import DataAnalysis from '@/assets/svgs/menus/data-analysis.svg';
// import Defi from '@/assets/svgs/menus/defi.svg';
// import Devtools from '@/assets/svgs/menus/dev-tools.svg';
// import Exchanges from '@/assets/svgs/menus/exchanges.svg';
// import GameFi from '@/assets/svgs/menus/game-fi.svg';
// import Governance from '@/assets/svgs/menus/governance.svg';
// import IndustryMedia from '@/assets/svgs/menus/industry-media.svg';
// import Infrastructure from '@/assets/svgs/menus/infrastructure.svg';
// import Kol from '@/assets/svgs/menus/kol.svg';
// import Nft from '@/assets/svgs/menus/nft.svg';
// import Nfts from '@/assets/svgs/menus/nfts.svg';
// import Rwa from '@/assets/svgs/menus/rwa.svg';
// import Security from '@/assets/svgs/menus/security.svg';
// import SocialFi from '@/assets/svgs/menus/social-fi.svg';
// import Stablecoin from '@/assets/svgs/menus/stablecoin.svg';
// import Utilities from '@/assets/svgs/menus/utilities.svg';
// import Wallet from '@/assets/svgs/menus/wallet.svg';
// import Web3navStar from '@/assets/svgs/menus/web3nav-star.svg';
// import VenturesStar from '@/assets/svgs/menus/ventures.svg';
// import Algorithm from '@/assets/svgs/menus/algorithm.svg';
// import Solutions from '@/assets/svgs/menus/scaling-solutions.svg';
// import Launchpads from '@/assets/svgs/menus/launchpads.svg';
// import Others from '@/assets/svgs/menus/others.svg';
// import Medianews from '@/assets/svgs/menus/media-news.svg';

type IconProps = PropsWithChildren<
  {
    className?: string;
    style?: CSSProperties;
  } & HTMLAttributes<HTMLElement>
>;

export type IconFn = (props: IconProps) => JSX.Element;

export const Icon = ({ className, style, children, ...props }: IconProps) => {
  return (
    <AntdIcon className={className} style={style} {...props}>
      {children}
    </AntdIcon>
  );
};

export const LogoIcon = (props: IconProps) => (
  <Icon {...props}>
    <LogoSvg />
  </Icon>
);
//
// export const DocsIcon = (props: IconProps) => (
//   <Icon {...props}>
//     <DocSvg />
//   </Icon>
// );
// export const EllipsisIcon = (props: IconProps) => (
//   <Icon {...props}>
//     <EllipsisSvg />
//   </Icon>
// );
//
// export const NetworkIcon = (props: IconProps) => (
//   <Icon {...props}>
//     <NetworkSvg />
//   </Icon>
// );
// export const ManageIcon = (props: IconProps) => (
//   <Icon {...props}>
//     <ManageSvg />
//   </Icon>
// );
//
// export const SignInIcon = (props: IconProps) => (
//   <Icon {...props}>
//     <SignIn />
//   </Icon>
// );
//
// export const XmarkIcon = (props: IconProps) => (
//   <Icon {...props}>
//     <XmarkSvg />
//   </Icon>
// );
//
// export const SignOutIcon = (props: IconProps) => (
//   <Icon {...props}>
//     <SignOut />
//   </Icon>
// );
//
// export const ThumbFillIcon = (props: IconProps) => (
//   <Icon {...props}>
//     <ThumbFillSvg />
//   </Icon>
// );
//
// export const ThumbIcon = (props: IconProps) => (
//   <Icon {...props}>
//     <ThumbSvg />
//   </Icon>
// );
//
// export const BookMarkIcon = (props: IconProps) => (
//   <Icon {...props}>
//     <BookMarkSvg />
//   </Icon>
// );
// export const SearchIcon = (props: IconProps) => (
//   <Icon {...props}>
//     <SearchSvg />
//   </Icon>
// );
// export const FilterIcon = (props: IconProps) => (
//   <Icon {...props}>
//     <FilterSvg />
//   </Icon>
// );
//
// export const ChevronLeft2Icon = (props: IconProps) => (
//   <Icon {...props}>
//     <ChevronLeft2 />
//   </Icon>
// );
//
// export const ChevronRight2Icon = (props: IconProps) => (
//   <Icon {...props}>
//     <ChevronRight2 />
//   </Icon>
// );
// export const ChevronLeftIcon = (props: IconProps) => (
//   <Icon {...props}>
//     <ChevronLeft />
//   </Icon>
// );
//
// export const ChevronRightIcon = (props: IconProps) => (
//   <Icon {...props}>
//     <ChevronRight />
//   </Icon>
// );
//
// export const BookMarkFillIcon = (props: IconProps) => (
//   <Icon {...props}>
//     <BookMarkFillSvg />
//   </Icon>
// );
//
// export const NftIcon = (props: IconProps) => (
//   <Icon {...props}>
//     <NftSvg />
//   </Icon>
// );
//
// export const DiamondIcon = (props: IconProps) => (
//   <Icon {...props}>
//     <DiamondSvg />
//   </Icon>
// );
// export const PlusIcon = (props: IconProps) => (
//   <Icon {...props}>
//     <PlusSvg />
//   </Icon>
// );
// export const DarkIcon = (props: IconProps) => (
//   <Icon {...props}>
//     <MoonSvg />
//   </Icon>
// );
// export const LightIcon = (props: IconProps) => (
//   <Icon {...props}>
//     <SunSvg />
//   </Icon>
// );
//
// export const DiscordSIcon = (props: IconProps) => (
//   <Icon {...props}>
//     <DiscordSvg />
//   </Icon>
// );
//
// export const MetaLineIcon = (props: IconProps) => (
//   <Icon {...props}>
//     <MetaLineSvg />
//   </Icon>
// );
//
// export const MediumIcon = (props: IconProps) => (
//   <Icon {...props}>
//     <MediumSvg />
//   </Icon>
// );
//
// export const TwitterIcon = (props: IconProps) => (
//   <Icon {...props}>
//     <TwitterSvg />
//   </Icon>
// );
//
// export const TelegramIcon = (props: IconProps) => (
//   <Icon {...props}>
//     <TelegramSvg />
//   </Icon>
// );
//
// export const YoutubeIcon = (props: IconProps) => (
//   <Icon {...props}>
//     <YoutubeSvg />
//   </Icon>
// );
//
// export const WalletIcon = (props: IconProps) => (
//   <Icon {...props}>
//     <WalletSvg />
//   </Icon>
// );
// export const MenuIcon = (props: IconProps) => (
//   <Icon {...props}>
//     <MenuSvg />
//   </Icon>
// );
//
// // menus
//
// export const AiToolsIcon = (props: IconProps) => (
//   <Icon {...props}>
//     <AiTools />
//   </Icon>
// );
// export const AirdropIcon = (props: IconProps) => (
//   <Icon {...props}>
//     <Airdrop />
//   </Icon>
// );
//
// export const BlockchainIcon = (props: IconProps) => (
//   <Icon {...props}>
//     <Blockchain />
//   </Icon>
// );
// export const BookIcon = (props: IconProps) => (
//   <Icon {...props}>
//     <Book />
//   </Icon>
// );
//
// export const BridgesIcon = (props: IconProps) => (
//   <Icon {...props}>
//     <Bridges />
//   </Icon>
// );
//
// export const Cr20protocolsIcon = (props: IconProps) => (
//   <Icon {...props}>
//     <Cr20protocols />
//   </Icon>
// );
//
// export const DaoIcon = (props: IconProps) => (
//   <Icon {...props}>
//     <Dao />
//   </Icon>
// );
//
// export const DataAnalysisIcon = (props: IconProps) => (
//   <Icon {...props}>
//     <DataAnalysis />
//   </Icon>
// );
//
// export const DefiIcon = (props: IconProps) => (
//   <Icon {...props}>
//     <Defi />
//   </Icon>
// );
//
// export const DevtoolsIcon = (props: IconProps) => (
//   <Icon {...props}>
//     <Devtools />
//   </Icon>
// );
// export const ExchangesIcon = (props: IconProps) => (
//   <Icon {...props}>
//     <Exchanges />
//   </Icon>
// );
//
// export const GameFiIcon = (props: IconProps) => (
//   <Icon {...props}>
//     <GameFi />
//   </Icon>
// );
// export const GovernanceIcon = (props: IconProps) => (
//   <Icon {...props}>
//     <Governance />
//   </Icon>
// );
// export const IndustryMediaIcon = (props: IconProps) => (
//   <Icon {...props}>
//     <IndustryMedia />
//   </Icon>
// );
//
// export const InfrastructureIcon = (props: IconProps) => (
//   <Icon {...props}>
//     <Infrastructure />
//   </Icon>
// );
//
// export const KolIcon = (props: IconProps) => (
//   <Icon {...props}>
//     <Kol />
//   </Icon>
// );
// export const Nft2Icon = (props: IconProps) => (
//   <Icon {...props}>
//     <Nft />
//   </Icon>
// );
//
// export const NftsIcon = (props: IconProps) => (
//   <Icon {...props}>
//     <Nfts />
//   </Icon>
// );
//
// export const RwaIcon = (props: IconProps) => (
//   <Icon {...props}>
//     <Rwa />
//   </Icon>
// );
//
// export const SecurityIcon = (props: IconProps) => (
//   <Icon {...props}>
//     <Security />
//   </Icon>
// );
// export const SocialFiIcon = (props: IconProps) => (
//   <Icon {...props}>
//     <SocialFi />
//   </Icon>
// );
//
// export const StablecoinIcon = (props: IconProps) => (
//   <Icon {...props}>
//     <Stablecoin />
//   </Icon>
// );
//
// export const UtilitiesIcon = (props: IconProps) => (
//   <Icon {...props}>
//     <Utilities />
//   </Icon>
// );
// export const Wallet2Icon = (props: IconProps) => (
//   <Icon {...props}>
//     <Wallet />
//   </Icon>
// );
// export const Web3navStarIcon = (props: IconProps) => (
//   <Icon {...props}>
//     <Web3navStar />
//   </Icon>
// );
//
// export const CopyIcon = (props: IconProps) => (
//   <Icon {...props}>
//     <CopySvg />
//   </Icon>
// );
//
// export const ArrowLeftIcon = (props: IconProps) => (
//   <Icon {...props}>
//     <ArrowLeft />
//   </Icon>
// );
//
// export const WarningIcon = (props: IconProps) => (
//   <Icon {...props}>
//     <WarningSvg />
//   </Icon>
// );
//
// export const WarningFillIcon = (props: IconProps) => (
//   <Icon {...props}>
//     <WarningFillSvg />
//   </Icon>
// );
// export const XMarkFillIcon = (props: IconProps) => (
//   <Icon {...props}>
//     <XmarkFillSvg />
//   </Icon>
// );
// export const SpinIcon = ({ className, ...props }: IconProps) => (
//   <Icon {...props} className={cn('animate-spin', className)}>
//     <SlowmoSvg />
//   </Icon>
// );
// export const EditIcon = (props: IconProps) => (
//   <Icon {...props}>
//     <EditSvg />
//   </Icon>
// );
// export const DeleteIcon = ({ ...props }: IconProps) => (
//   <Icon {...props}>
//     <DeleteSvg />
//   </Icon>
// );
// export const ChevronExpandIcon = ({ ...props }: IconProps) => (
//   <Icon {...props}>
//     <ChevronExpandSvg />
//   </Icon>
// );
//
// export const CheckmarkFillIcon = ({ ...props }: IconProps) => (
//   <Icon {...props}>
//     <CheckmarkFillSvg />
//   </Icon>
// );
// export const CheckmarkIcon = ({ ...props }: IconProps) => (
//   <Icon {...props}>
//     <CheckmarkSvg />
//   </Icon>
// );
// export const ClockIcon = ({ ...props }: IconProps) => (
//   <Icon {...props}>
//     <ClockSvg />
//   </Icon>
// );
//
// export const VenturesStarIcon = ({ ...props }: IconProps) => (
//   <Icon {...props}>
//     <VenturesStar />
//   </Icon>
// );
// export const AlgorithmIcon = ({ ...props }: IconProps) => (
//   <Icon {...props}>
//     <Algorithm />
//   </Icon>
// );
// export const SolutionsIcon = ({ ...props }: IconProps) => (
//   <Icon {...props}>
//     <Solutions />
//   </Icon>
// );
// export const LaunchpadsIcon = ({ ...props }: IconProps) => (
//   <Icon {...props}>
//     <Launchpads />
//   </Icon>
// );
// export const OthersIcon = ({ ...props }: IconProps) => (
//   <Icon {...props}>
//     <Others />
//   </Icon>
// );
// export const MediaNewsIcon = ({ ...props }: IconProps) => (
//   <Icon {...props}>
//     <Medianews />
//   </Icon>
// );
// export const RedditIcon = ({ ...props }: IconProps) => (
//   <Icon {...props}>
//     <RedditSvg />
//   </Icon>
// );
// export const FacebookIcon = ({ ...props }: IconProps) => (
//   <Icon {...props}>
//     <FacebookSvg />
//   </Icon>
// );
// export const CoinmarketcapIcon = ({ ...props }: IconProps) => (
//   <Icon {...props}>
//     <CoinmarketcapSvg />
//   </Icon>
// );
// export const EtherscanIcon = ({ ...props }: IconProps) => (
//   <Icon {...props}>
//     <EtherscanSvg />
//   </Icon>
// );
// export const GithubIcon = ({ ...props }: IconProps) => (
//   <Icon {...props}>
//     <GithubSvg />
//   </Icon>
// );
// export const ArrowRightUpIcon = ({ ...props }: IconProps) => (
//   <Icon {...props}>
//     <ArrowRightUp />
//   </Icon>
// );
// export const InfoCircleIcon = ({ ...props }: IconProps) => (
//   <Icon {...props}>
//     <InfoCircleSvg />
//   </Icon>
// );
// export const UploadIcon = ({ ...props }: IconProps) => (
//   <Icon {...props}>
//     <UploadSvg />
//   </Icon>
// );
// export const ArrowToTopIcon = ({ ...props }: IconProps) => (
//   <Icon {...props}>
//     <ArrowToTopSvg />
//   </Icon>
// );
// export const PlaceholderIcon = ({ ...props }: IconProps) => (
//   <Icon {...props}>
//     <PlaceholderSvg />
//   </Icon>
// );
// export const EyeIcon = ({ ...props }: IconProps) => (
//   <Icon {...props}>
//     <EyeSvg />
//   </Icon>
// );
// export const EyeCloseIcon = ({ ...props }: IconProps) => (
//   <Icon {...props}>
//     <EyeCloseSvg />
//   </Icon>
// );
