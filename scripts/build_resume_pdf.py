from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    ListFlowable,
    ListItem,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "Medvedskiy_Pavlo_Resume.pdf"

INK = colors.HexColor("#0F172A")
MUTED = colors.HexColor("#475569")
LIGHT = colors.HexColor("#F8FAFC")
BORDER = colors.HexColor("#CBD5E1")
CYAN = colors.HexColor("#0891B2")
AMBER = colors.HexColor("#92400E")


styles = getSampleStyleSheet()

styles.add(
    ParagraphStyle(
        name="Name",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=19,
        leading=22,
        textColor=INK,
        alignment=TA_CENTER,
        spaceAfter=1,
    )
)
styles.add(
    ParagraphStyle(
        name="Role",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=11.5,
        leading=14,
        textColor=CYAN,
        alignment=TA_CENTER,
        spaceAfter=4,
    )
)
styles.add(
    ParagraphStyle(
        name="Contact",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=8.0,
        leading=10,
        textColor=MUTED,
        alignment=TA_CENTER,
        spaceAfter=7,
    )
)
styles.add(
    ParagraphStyle(
        name="Section",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=10.2,
        leading=12,
        textColor=CYAN,
        spaceBefore=7,
        spaceAfter=4,
        borderColor=colors.HexColor("#67E8F9"),
        borderWidth=0,
        borderPadding=0,
    )
)
styles.add(
    ParagraphStyle(
        name="Body",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=8.8,
        leading=10.7,
        textColor=INK,
        alignment=TA_LEFT,
        spaceAfter=3,
    )
)
styles.add(
    ParagraphStyle(
        name="Muted",
        parent=styles["Body"],
        fontSize=8.3,
        leading=10.0,
        textColor=MUTED,
        fontName="Helvetica-Oblique",
        spaceAfter=2,
    )
)
styles.add(
    ParagraphStyle(
        name="RoleLine",
        parent=styles["Body"],
        fontName="Helvetica",
        fontSize=9.2,
        leading=11,
        textColor=INK,
        spaceBefore=3.5,
        spaceAfter=1.2,
    )
)
styles.add(
    ParagraphStyle(
        name="ResumeBullet",
        parent=styles["Body"],
        fontSize=8.55,
        leading=10.1,
        leftIndent=0,
        firstLineIndent=0,
        spaceAfter=1.4,
    )
)
styles.add(
    ParagraphStyle(
        name="Skill",
        parent=styles["Body"],
        fontSize=8.6,
        leading=10.2,
        spaceAfter=1.8,
    )
)
styles.add(
    ParagraphStyle(
        name="SmallCell",
        parent=styles["Body"],
        fontSize=8.15,
        leading=9.7,
        spaceAfter=1,
    )
)
styles.add(
    ParagraphStyle(
        name="CellTitle",
        parent=styles["Body"],
        fontName="Helvetica-Bold",
        fontSize=8.4,
        leading=10,
        textColor=CYAN,
        spaceAfter=2,
    )
)


def section(title):
    return [
        Paragraph(title.upper(), styles["Section"]),
        Table([[""]], colWidths=[7.1 * inch], rowHeights=[1.2], style=TableStyle([("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#67E8F9"))])),
        Spacer(1, 3),
    ]


def bullet_list(items, width=6.95 * inch):
    rows = []
    for item in items:
        marker = Paragraph("-", styles["ResumeBullet"])
        text = Paragraph(item, styles["ResumeBullet"])
        rows.append([marker, text])

    table = Table(rows, colWidths=[0.16 * inch, width - 0.16 * inch], hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
                ("TEXTCOLOR", (0, 0), (0, -1), CYAN),
            ]
        )
    )
    return table


def role(company, position, period, context=None):
    flow = [
        Paragraph(
            f"<b>{company}</b> - {position} | <font color='{AMBER.hexval()}'><b>{period}</b></font>",
            styles["RoleLine"],
        )
    ]
    if context:
        flow.append(Paragraph(context, styles["Muted"]))
    return flow


def skill_line(label, items):
    return Paragraph(f"<b>{label}:</b> {', '.join(items)}", styles["Skill"])


def footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(BORDER)
    canvas.setLineWidth(0.3)
    canvas.line(0.55 * inch, 0.37 * inch, 7.95 * inch, 0.37 * inch)
    canvas.setFont("Helvetica", 7.3)
    canvas.setFillColor(MUTED)
    canvas.drawCentredString(4.25 * inch, 0.22 * inch, "Pavlo Medvedskyi | Senior Quality Assurance Engineer")
    canvas.restoreState()


def build():
    doc = BaseDocTemplate(
        str(OUT),
        pagesize=LETTER,
        leftMargin=0.55 * inch,
        rightMargin=0.55 * inch,
        topMargin=0.42 * inch,
        bottomMargin=0.5 * inch,
    )
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="normal")
    doc.addPageTemplates([PageTemplate(id="resume", frames=[frame], onPage=footer)])

    flow = []

    flow.append(Paragraph("PAVLO MEDVEDSKYI", styles["Name"]))
    flow.append(Paragraph("Senior Quality Assurance Engineer", styles["Role"]))
    flow.append(
        Paragraph(
            "Kharkiv, Ukraine | Medvedskiypa@gmail.com | t.me/Wisll | "
            "linkedin.com/in/pavlo-medvedskyi-74231913b | pavlo-medvedskyi.github.io",
            styles["Contact"],
        )
    )
    flow.append(Spacer(1, 2))

    flow += section("Summary")
    flow.append(
        Paragraph(
            "Senior Quality Assurance Engineer with 8+ years of commercial experience in desktop, web, API, "
            "database, and real-time systems testing. Experienced in functional, integration, regression, "
            "exploratory, smoke, release, and system testing. Strong background in requirements analysis, "
            "test design, SQL, API validation, databases, network protocols, Electron applications, Docker, "
            "Linux, and cross-platform validation. Comfortable investigating defects through logs, data state, "
            "client-server behavior, and business logic, with mentoring and knowledge-sharing experience.",
            styles["Body"],
        )
    )

    flow += section("Core Technical Skills")
    flow.extend(
        [
            skill_line(
                "Testing",
                [
                    "Functional",
                    "Integration",
                    "Regression",
                    "Smoke",
                    "Exploratory",
                    "System",
                    "Release Validation",
                    "Cross-platform Testing",
                ],
            ),
            skill_line(
                "Technical QA",
                [
                    "Requirements Analysis",
                    "Test Design",
                    "API Testing",
                    "SQL",
                    "Database Validation",
                    "Log Analysis",
                    "Defect Investigation",
                    "Client-server Validation",
                ],
            ),
            skill_line(
                "Platforms",
                [
                    "Desktop Applications",
                    "Web Applications",
                    "Mobile",
                    "Electron",
                    "Ubuntu",
                    "Windows",
                    "macOS",
                    "Linux",
                    "Docker",
                ],
            ),
            skill_line(
                "Tools",
                [
                    "Postman",
                    "Swagger",
                    "Jira",
                    "Zephyr",
                    "TestRail",
                    "Confluence",
                    "Fiddler",
                    "Chrome DevTools",
                    "Sentry",
                    "Google Cloud Console",
                    "OpenShift",
                    "VirtualBox",
                ],
            ),
            skill_line("Automation Exposure", ["Java", "Rest Assured", "TestNG", "Postman runners", "Selenide/Selenium basics"]),
            skill_line("Databases", ["PostgreSQL", "MSSQL", "Derby DB", "MongoDB", "DynamoDB", "BigQuery", "DBeaver"]),
        ]
    )

    flow += section("Work Experience")
    flow += role(
        "CODY SOLUTIONS",
        "Senior QA Engineer",
        "Jan 2025 - Present",
        "Confidential NDA desktop platform - large-scale Electron application with cross-platform delivery.",
    )
    flow.append(
        bullet_list(
            [
                "Currently working on a technically complex Electron desktop application under NDA, with validation across Ubuntu, Windows, and macOS.",
                "Own functional, integration, regression, exploratory, system, and release validation activities for desktop and connected backend functionality.",
                "Analyze requirements, clarify edge cases, design test coverage, and validate business logic across client-server workflows.",
                "Investigate defects using logs, API responses, database state, simulator behavior, and environment-specific reproduction steps.",
                "Perform API and database validation, including SQL checks and integration verification across backend and desktop layers.",
                "Support QA documentation, test reporting, regression planning, onboarding, mentoring, and knowledge sharing within Agile delivery.",
            ]
        )
    )

    flow += role("1648 FACTORY", "Senior QA Engineer", "2024", "Fintech web application for cryptocurrency trading.")
    flow.append(
        bullet_list(
            [
                "Performed manual, API, and database testing across multiple environments, including PostgreSQL validation.",
                "Created and executed automated Postman collections and runners for API regression coverage.",
                "Validated MetaMask integration, transaction flows, and key web application scenarios.",
                "Executed smoke and regression testing for web builds; maintained test cases and QA documentation.",
                "Collaborated with developers and product owners to clarify requirements and support Scrum delivery.",
            ]
        )
    )

    flow += role("RAILSWARE", "QA Engineer", "2022 - 2023", "Coupler.io - SaaS data synchronization platform.")
    flow.append(
        bullet_list(
            [
                "Validated data synchronization workflows, API integrations, and database behavior for scheduled data transfers.",
                "Tested integrations with Facebook Ads, LinkedIn Ads, Google Ads, Shopify, WooCommerce, and other external services.",
                "Performed API, database, regression, smoke, responsive, and mobile testing for weekly releases.",
                "Analyzed production and staging issues using Google Cloud Console, Sentry, logs, and product support context.",
                "Maintained test plans, checklists, documentation, and cross-functional communication with product and engineering teams.",
            ]
        )
    )

    flow.append(PageBreak())
    flow += section("Work Experience Continued")
    flow += role(
        "SOFTSERVE",
        "QA Engineer",
        "2019 - 2022",
        "Service delivery and monitoring solutions across VoIP, SIP, and MPLS network environments.",
    )
    flow.append(
        bullet_list(
            [
                "Analyzed functional requirements and created QA strategy, test cases, regression suites, and smoke coverage.",
                "Performed web, API, installation, and compatibility testing on Windows and Unix/CentOS environments.",
                "Validated backend data integrity with PostgreSQL and tested API behavior using Postman and Fiddler.",
                "Investigated defects through application/server logs, OpenShift environments, Java applications, and deployment context.",
                "Worked with VirtualBox, Chocolatey, Google Cloud, OpenShift, and distributed client-server environments.",
                "Mentored junior QA engineers, reviewed test cases, supported onboarding, and participated in QA appraisals.",
            ]
        )
    )

    flow += role("EPAM SYSTEMS", "QA Engineer", "2018 - 2019", "EPAM Cloud - multi-cloud orchestrator for AWS, GCP, and Azure.")
    flow.append(
        bullet_list(
            [
                "Performed manual functional, UI, database, CLI, and mobile testing for cloud management workflows.",
                "Created test cases, documented defects and test results in Jira, and supported Agile QA activities.",
                "Validated data behavior in MongoDB and DynamoDB and tested cloud-provider related scenarios.",
                "Collaborated with developers and QA team members during daily standups, reviews, and regression cycles.",
            ]
        )
    )

    flow += section("Selected Project Exposure")
    table_data = [
        [Paragraph("Confidential Enterprise Desktop Platform", styles["CellTitle"]), Paragraph("SaaS / Fintech / Data Platforms", styles["CellTitle"])],
        [
            bullet_list(
                [
                    "Electron desktop QA",
                    "Ubuntu / Windows / macOS",
                    "Simulator testing",
                    "Release validation",
                    "API, DB, logs, and integration checks",
                ],
                width=3.18 * inch,
            ),
            bullet_list(
                [
                    "Web, mobile, API, and database testing",
                    "External API integrations and ETL flows",
                    "Crypto transaction and wallet-related workflows",
                    "Regression, smoke, exploratory, and support-driven testing",
                    "Requirements analysis and documentation",
                ],
                width=3.18 * inch,
            ),
        ],
    ]
    table = Table(table_data, colWidths=[3.48 * inch, 3.48 * inch], hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), LIGHT),
                ("BOX", (0, 0), (-1, -1), 0.4, BORDER),
                ("INNERGRID", (0, 0), (-1, -1), 0.25, BORDER),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 7),
                ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ]
        )
    )
    flow.append(table)

    flow += section("Professional Focus")
    flow.append(
        bullet_list(
            [
                "Technically challenging products where quality depends on understanding system behavior, integrations, and data flow.",
                "Evidence-based defect investigation using logs, API responses, database state, and reproducible steps.",
                "Independent QA ownership across the SDLC with close collaboration across product, development, and support teams.",
            ]
        )
    )

    doc.build(flow)
    print(OUT)


if __name__ == "__main__":
    build()
