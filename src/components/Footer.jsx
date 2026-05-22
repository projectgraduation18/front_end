 import { GraduationCap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Bottom bar only */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">

          {/* Left */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-md shadow-primary/30">
              <GraduationCap className="w-4 h-4 text-primary-foreground" />
            </div>

            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()}{" "}
              <span className="font-medium text-foreground">
                Faculty of Computers & Information
              </span>
            </p>
          </div>

          {/* Right */}
          <p className="text-xs text-muted-foreground">
            Made with ❤️ as a Graduation Project
          </p>

        </div>
      </div>
    </footer>
  );
}