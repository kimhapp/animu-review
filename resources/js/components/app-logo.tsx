import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <div className="flex items-center space-x-2">
            <div className="grid flex-1 text-left text-sm">
            <span className="italic font-semibold text-2xl bg-gradient-to-t from-red-500 via-blue-500 to-white bg-clip-text text-transparent">
              AnimuReview
            </span>
            </div>
        </div>
    );
}
