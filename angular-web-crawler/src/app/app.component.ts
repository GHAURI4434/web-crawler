import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { Observable } from 'rxjs';

// Define the NEWS interface
interface NEWS {
  title: string;
  description: string;
  expanded?: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ghauriWebCrawler'; // Adding the title property
  news: NEWS[] = [];
  selectedNews: NEWS | null = null; // For showing the description of the selected news item
  hasFetched = false;

  private http = inject(HttpClient); // Inject HttpClient

  private url = 'https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=1aded13dd75a4adbbd9cbc5ce3e26960';

  fetchNews() {
    this.http.get<{ articles: NEWS[] }>(this.url).subscribe({
      next: (response: { articles: NEWS[] }) => {
        this.news = response.articles.map((article: NEWS) => ({
          title: article.title,
          description: article.description,
          expanded: false, // Add expanded property dynamically
        }));
        this.hasFetched = true;
      },
      error: (error: any) => {
        console.error('Error fetching news:', error);
        this.hasFetched = true;
      },
    });
  }

  selectNews(newsItem: NEWS) {
    this.selectedNews = newsItem; // Set the selected news item for showing description
  }
}
