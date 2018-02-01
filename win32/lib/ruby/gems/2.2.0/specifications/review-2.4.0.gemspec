# -*- encoding: utf-8 -*-
# stub: review 2.4.0 ruby lib

Gem::Specification.new do |s|
  s.name = "review"
  s.version = "2.4.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib"]
  s.authors = ["kmuto", "takahashim"]
  s.date = "2017-06-29"
  s.description = "Re:VIEW is a digital publishing system for books and ebooks. It supports InDesign, EPUB and LaTeX."
  s.email = "kmuto@debian.org"
  s.executables = ["review", "review-catalog-converter", "review-check", "review-checkdep", "review-compile", "review-epubmaker", "review-index", "review-init", "review-pdfmaker", "review-preproc", "review-validate", "review-vol", "review-webmaker"]
  s.files = ["bin/review", "bin/review-catalog-converter", "bin/review-check", "bin/review-checkdep", "bin/review-compile", "bin/review-epubmaker", "bin/review-index", "bin/review-init", "bin/review-pdfmaker", "bin/review-preproc", "bin/review-validate", "bin/review-vol", "bin/review-webmaker"]
  s.homepage = "http://github.com/kmuto/review"
  s.licenses = ["LGPL"]
  s.rubygems_version = "2.4.5"
  s.summary = "Re:VIEW: a easy-to-use digital publishing system"

  s.installed_by_version = "2.4.5" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<image_size>, [">= 0"])
      s.add_runtime_dependency(%q<rouge>, [">= 0"])
      s.add_runtime_dependency(%q<rubyzip>, [">= 0"])
      s.add_development_dependency(%q<pygments.rb>, [">= 0"])
      s.add_development_dependency(%q<rake>, [">= 0"])
      s.add_development_dependency(%q<rubocop>, [">= 0"])
      s.add_development_dependency(%q<test-unit>, [">= 0"])
    else
      s.add_dependency(%q<image_size>, [">= 0"])
      s.add_dependency(%q<rouge>, [">= 0"])
      s.add_dependency(%q<rubyzip>, [">= 0"])
      s.add_dependency(%q<pygments.rb>, [">= 0"])
      s.add_dependency(%q<rake>, [">= 0"])
      s.add_dependency(%q<rubocop>, [">= 0"])
      s.add_dependency(%q<test-unit>, [">= 0"])
    end
  else
    s.add_dependency(%q<image_size>, [">= 0"])
    s.add_dependency(%q<rouge>, [">= 0"])
    s.add_dependency(%q<rubyzip>, [">= 0"])
    s.add_dependency(%q<pygments.rb>, [">= 0"])
    s.add_dependency(%q<rake>, [">= 0"])
    s.add_dependency(%q<rubocop>, [">= 0"])
    s.add_dependency(%q<test-unit>, [">= 0"])
  end
end
