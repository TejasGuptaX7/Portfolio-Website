import React from 'react';

const GithubContributions = () => {
    // Generate static random data for the contribution graph to visually match the design
    // 53 weeks * 7 days. Math.random() is fine for a static visual representation.
    const contributionData = Array.from({ length: 53 * 7 }, () => Math.floor(Math.random() * 5));

    const getContributionColor = (level: number): string => {
        switch (level) {
            case 1:
                return 'bg-[#C5D1C3]'; // Custom light green, derived from theme
            case 2:
                return 'bg-accent-green-light'; // Mapped to #8B9D88 from theme
            case 3:
                return 'bg-[#758F76]'; // Custom mid green
            case 4:
                return 'bg-accent-green-dark'; // Mapped to #5F7A62 from theme
            default:
                return 'bg-[#e5e5e5]'; // Using neutral gray for empty, matching screenshot
        }
    };

    const dayLabels = ['', 'M', '', 'W', '', 'F', ''];

    return (
        <div className="w-full mt-10 md:mt-12">
            <div className="flex items-center justify-center mb-3 md:mb-4">
                <div className="h-px w-8 md:w-16 bg-border mr-2 md:mr-3" />
                <h3 className="text-[10px] md:text-lg font-bold text-text-primary font-serif italic whitespace-nowrap">
                    github contributions
                </h3>
                <div className="h-px w-8 md:w-16 bg-border ml-2 md:ml-3" />
            </div>

            <p className="text-[7px] md:text-xs text-muted-foreground text-center italic mb-3 md:mb-4">
                github contributions from July 2025 to present
            </p>

            <div className="border border-border rounded-lg p-2 md:p-4 overflow-x-auto">
                <div className="inline-block min-w-full align-top">
                    {/* Month Labels */}
                    <div className="grid grid-cols-53 text-[10px] md:text-xs text-muted-foreground" style={{ paddingLeft: '28px' }}>
                        <div className="col-start-1">Jul</div>
                        <div className="col-start-5">Aug</div>
                        <div className="col-start-9">Sep</div>
                        <div className="col-start-14">Oct</div>
                        <div className="col-start-18">Nov</div>
                        <div className="col-start-22">Dec</div>
                        <div className="col-start-27">Jan</div>
                        <div className="col-start-31">Feb</div>
                        <div className="col-start-35">Mar</div>
                        <div className="col-start-40">Apr</div>
                        <div className="col-start-44">May</div>
                        <div className="col-start-48">Jun</div>
                    </div>

                    <div className="flex mt-1">
                        {/* Day Labels */}
                        <div className="grid grid-rows-7 text-[10px] md:text-xs text-muted-foreground mr-2 shrink-0">
                            {dayLabels.map((label, i) => (
                                <div key={i} className="h-3 md:h-4 flex items-center justify-start">{label}</div>
                            ))}
                        </div>

                        {/* Contribution Grid */}
                        <div className="grid grid-rows-7 grid-flow-col gap-1 w-full">
                            {contributionData.map((level, index) => (
                                <div
                                    key={index}
                                    className={`w-3 h-3 md:w-4 md:h-4 rounded-sm ${getContributionColor(level)}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                
                {/* Legend */}
                <div className="flex justify-end items-center gap-2 mt-4 text-[10px] md:text-xs text-muted-foreground">
                    <span>Less</span>
                    <div className={`w-3 h-3 rounded-sm ${getContributionColor(0)}`}></div>
                    <div className={`w-3 h-3 rounded-sm ${getContributionColor(1)}`}></div>
                    <div className={`w-3 h-3 rounded-sm ${getContributionColor(2)}`}></div>
                    <div className={`w-3 h-3 rounded-sm ${getContributionColor(3)}`}></div>
                    <div className={`w-3 h-3 rounded-sm ${getContributionColor(4)}`}></div>
                    <span>More</span>
                </div>
            </div>
        </div>
    );
};

export default GithubContributions;